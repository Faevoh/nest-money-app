/// <reference types="multer" />
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
export declare class CloudinaryService {
    uploadNin(file: Express.Multer.File, resourceType: 'image' | 'raw', folder: 'NIN'): Promise<UploadApiResponse | UploadApiErrorResponse>;
    uploadCert(file: Express.Multer.File, resourceType: 'image' | 'raw', folder: 'CERT'): Promise<UploadApiResponse | UploadApiErrorResponse>;
    uploadMemo(file: Express.Multer.File, resourceType: 'image' | 'raw', folder: 'MEMO'): Promise<UploadApiResponse | UploadApiErrorResponse>;
    uploadImage(fileName: Express.Multer.File, resourceType: 'image' | 'raw', folder: 'IMAGE'): Promise<UploadApiResponse | UploadApiErrorResponse>;
}
