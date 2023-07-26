import { Injectable } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { v2 as cloudinaryV2 } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';

@Injectable()
export class MulterCloudinaryService {
  constructor(private readonly configService: ConfigService) {}

  storage(): MulterOptions['storage'] {
    return {
      storage: diskStorage({}), 
    };
  }

  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  }

  async uploadToCloudinary(file: Express.Multer.File): Promise<any> {
    try {
      const uploadedImage = await cloudinaryV2.uploader.upload(file.path);
      return {
        imageUrl: uploadedImage.secure_url,
        publicId: uploadedImage.public_id,
      };
    } catch (error) {
      throw new Error('Error uploading image to Cloudinary');
    }
  }
}
