export interface FileMetadata {
    name: string;
    originalName: string;
    size: number;
    mimeType: string;
    url: string;
}
export declare class FilesService {
    private readonly files;
    save(meta: FileMetadata): FileMetadata;
    findAll(): FileMetadata[];
}
