import { Injectable } from '@nestjs/common';

export interface FileMetadata {
  name: string;
  originalName: string;
  size: number;
  mimeType: string;
  url: string;
}

@Injectable()
export class FilesService {
  private readonly files: FileMetadata[] = [];

  save(meta: FileMetadata): FileMetadata {
    this.files.push(meta);
    return meta;
  }

  findAll(): FileMetadata[] {
    return this.files;
  }
}
