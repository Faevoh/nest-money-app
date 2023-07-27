import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { config } from 'dotenv';

config();

@Injectable()
export class CloudinaryService {
    async uploadImage(
        fileName: Express.Multer.File,
      ): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
          v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
          });
          console.log(process.env.CLOUD_NAME)
          const upload = v2.uploader.upload_stream((error, result) => {
            if (error) return reject(error);
            resolve(result);
            console.log("cloudinary result")
            console.log(result)
          });
          toStream(fileName.buffer).pipe(upload);
        });
      }
}
