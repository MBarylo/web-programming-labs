import type { Response } from 'express';
import { FilesService } from './files.service';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadFile(file: Express.Multer.File): import("./files.service").FileMetadata;
    findAll(): import("./files.service").FileMetadata[];
    serveFile(name: string, res: Response): void;
}
