import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { config } from 'dotenv';

config();

@Injectable()
export class CloudinaryService {
  async uploadNin(
    file: Express.Multer.File,
    resourceType: 'image' | 'raw' = 'image',
    folder: 'NIN'
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      v2.config({
        cloud_name: "dwt2lavnm",
        api_key: "989516128674283",
        api_secret: "aLYAw_Cs2Jy2CsfheRGHtiU4CFM",
      });
      const upload = v2.uploader.upload_stream({resource_type: resourceType,folder},
        (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }

  async uploadCert(
    file: Express.Multer.File,
    resourceType: 'image' | 'raw' = 'image',
    folder: 'CERT'
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      v2.config({
        cloud_name: "dwt2lavnm",
        api_key: "989516128674283",
        api_secret: "aLYAw_Cs2Jy2CsfheRGHtiU4CFM",
      });
      const upload = v2.uploader.upload_stream({resource_type: resourceType,folder},
        (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }

  async uploadMemo(
    file: Express.Multer.File,
    resourceType: 'image' | 'raw' = 'image',
    folder: 'MEMO'
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      v2.config({
        cloud_name: "dwt2lavnm",
        api_key: "989516128674283",
        api_secret: "aLYAw_Cs2Jy2CsfheRGHtiU4CFM",
      });
      const upload = v2.uploader.upload_stream({resource_type: resourceType,folder},
        (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }

  async uploadImage(
    fileName: Express.Multer.File,
    resourceType: 'image' | 'raw' = 'image',
    folder: 'IMAGE'
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      v2.config({
        cloud_name: "dwt2lavnm",
        api_key: "989516128674283",
        api_secret: "aLYAw_Cs2Jy2CsfheRGHtiU4CFM",
      });
      const upload = v2.uploader.upload_stream({resource_type: resourceType,folder},
        (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(fileName.buffer).pipe(upload);
    });
  }
}
