import {
  Controller,
  Post,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  BadRequestException,
  Res,
  HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import type { Response } from 'express';
import { FilesService } from './files.service';
import * as fs from 'fs';

const UPLOADS_DIR = join(process.cwd(), 'uploads');
const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/webp'];

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @HttpCode(201)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: UPLOADS_DIR,
        filename: (_req, file, cb) => {
          const ext = extname(file.originalname);
          cb(null, `${uuidv4()}${ext}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    // Перевірка MIME-типу вручну (FileTypeValidator перевіряє розширення, а не mimetype)
    if (!ALLOWED_MIMES.includes(file.mimetype)) {
      // Видалити вже збережений файл
      fs.unlink(file.path, () => {});
      throw new BadRequestException(
        `Недозволений тип файлу: ${file.mimetype}. Дозволено: image/jpeg, image/png, image/webp`,
      );
    }

    const url = `http://localhost:3000/files/${file.filename}`;
    const meta = this.filesService.save({
      name: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
      url,
    });
    return meta;
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':name')
  serveFile(@Param('name') name: string, @Res() res: Response) {
    const filePath = join(UPLOADS_DIR, name);
    return res.sendFile(filePath);
  }
}
