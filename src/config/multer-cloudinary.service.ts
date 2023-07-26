import { Injectable } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { v2 as cloudinaryV2 } from 'cloudinary';
const { CloudinaryStorage } = require('multer-storage-cloudinary');
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MulterCloudinaryService {
  constructor(private readonly configService: ConfigService) {}

  storage(): MulterOptions['storage'] {
    const cloudinaryOptions = {
      cloudName: this.configService.get<string>(process.env.CLOUD_NAME),
      apiKey: this.configService.get<string>(process.env.API_KEY),
      apiSecret: this.configService.get<string>(process.env.API_SECRET),
    };

    return {
      storage: new CloudinaryStorage({
        cloudinary: cloudinaryV2,
        params: {
          folder: 'NIN_images',
          allowedFormats: ['jpg', 'jpeg', 'png'],
        },
      }),
    };
  }

  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  }
}
