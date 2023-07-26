declare module 'multer-storage-cloudinary' {
    interface CloudinaryOptions {
      cloudName: string;
      apiKey: string;
      apiSecret: string;
    }
  
    interface CloudinaryStorageOptions {
      cloudinary: CloudinaryOptions;
      params?: {
        folder?: string;
        allowedFormats?: string[];
      };
    }
  }