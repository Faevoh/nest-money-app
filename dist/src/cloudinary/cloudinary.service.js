"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const toStream = require("buffer-to-stream");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
let CloudinaryService = class CloudinaryService {
    async uploadNin(fileName, resourceType = 'image', folder) {
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.config({
                cloud_name: "dwt2lavnm",
                api_key: "989516128674283",
                api_secret: "aLYAw_Cs2Jy2CsfheRGHtiU4CFM",
            });
            const upload = cloudinary_1.v2.uploader.upload_stream({ resource_type: resourceType, folder }, (error, result) => {
                if (error)
                    return reject(error);
                console.log("this is nin's error", error);
                resolve(result);
            });
            toStream(fileName.buffer).pipe(upload);
        });
    }
    async uploadCert(fileName, resourceType = 'image', folder) {
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.config({
                cloud_name: "dwt2lavnm",
                api_key: "989516128674283",
                api_secret: "aLYAw_Cs2Jy2CsfheRGHtiU4CFM",
            });
            const upload = cloudinary_1.v2.uploader.upload_stream({ resource_type: resourceType, folder }, (error, result) => {
                if (error)
                    return reject(error);
                console.log("this is cert's error", error);
                resolve(result);
            });
            toStream(fileName.buffer).pipe(upload);
        });
    }
    async uploadMemo(fileName, resourceType = 'image', folder) {
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.config({
                cloud_name: "dwt2lavnm",
                api_key: "989516128674283",
                api_secret: "aLYAw_Cs2Jy2CsfheRGHtiU4CFM",
            });
            const upload = cloudinary_1.v2.uploader.upload_stream({ resource_type: resourceType, folder }, (error, result) => {
                if (error)
                    return reject(error);
                console.log("this is memo's error", error);
                resolve(result);
            });
            toStream(fileName.buffer).pipe(upload);
        });
    }
    async uploadImage(fileName, resourceType = 'image', folder) {
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.config({
                cloud_name: "dwt2lavnm",
                api_key: "989516128674283",
                api_secret: "aLYAw_Cs2Jy2CsfheRGHtiU4CFM",
            });
            const upload = cloudinary_1.v2.uploader.upload_stream({ resource_type: resourceType, folder }, (error, result) => {
                if (error)
                    return reject(error);
                resolve(result);
            });
            toStream(fileName.buffer).pipe(upload);
        });
    }
};
CloudinaryService = __decorate([
    (0, common_1.Injectable)()
], CloudinaryService);
exports.CloudinaryService = CloudinaryService;
//# sourceMappingURL=cloudinary.service.js.map