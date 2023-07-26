import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ConfigService } from '@nestjs/config';
export declare class MulterCloudinaryService {
    private readonly configService;
    constructor(configService: ConfigService);
    storage(): MulterOptions['storage'];
    fileFilter(req: any, file: any, callback: any): any;
}
