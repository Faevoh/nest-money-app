"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterCloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const config_1 = require("@nestjs/config");
let MulterCloudinaryService = class MulterCloudinaryService {
    constructor(configService) {
        this.configService = configService;
    }
    storage() {
        return {
            const: cloudinaryOptions = {
                cloudName: this.configService.get(process.env.CLOUD_NAME),
                apiKey: this.configService.get(process.env.API_KEY),
                apiSecret: this.configService.get(process.env.API_SECRET),
            }
        };
    }
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
    }
    async uploadToCloudinary(file) {
        try {
            const uploadedImage = await cloudinary_1.v2.uploader.upload(file.path);
            return {
                imageUrl: uploadedImage.secure_url,
                publicId: uploadedImage.public_id,
            };
        }
        catch (error) {
            throw new Error('Error uploading image to Cloudinary');
        }
    }
};
MulterCloudinaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MulterCloudinaryService);
exports.MulterCloudinaryService = MulterCloudinaryService;
//# sourceMappingURL=multer-cloudinary.service.js.map