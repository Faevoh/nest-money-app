/// <reference types="multer" />
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
export declare class CloudinaryService {
    uploadNin(fileName: Express.Multer.File, resourceType: 'image' | 'raw', folder: 'NIN'): Promise<UploadApiResponse | UploadApiErrorResponse>;
    uploadCert(fileName: Express.Multer.File, resourceType: 'image' | 'raw', folder: 'CERT'): Promise<UploadApiResponse | UploadApiErrorResponse>;
    uploadMemo(fileName: Express.Multer.File, resourceType: 'image' | 'raw', folder: 'MEMO'): Promise<UploadApiResponse | UploadApiErrorResponse>;
    uploadImage(fileName: Express.Multer.File, resourceType: 'image' | 'raw', folder: 'IMAGE'): Promise<UploadApiResponse | UploadApiErrorResponse>;
}
