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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplianceController = void 0;
const common_1 = require("@nestjs/common");
const compliance_service_1 = require("./compliance.service");
const express_1 = require("express");
const cloudinary = require("cloudinary");
const updateComp_1 = require("../DTO/updateComp");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const platform_express_1 = require("@nestjs/platform-express");
let ComplianceController = class ComplianceController {
    constructor(compService, jwtService, userService) {
        this.compService = compService;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async addCompliance(access_token, file) {
        const createCompDto = Object.assign(Object.assign({}, JSON.parse(express_1.request.body.createCompDto)), { imageUrl: '', publicId: '' });
        console.log("what is it?");
        if (file) {
            const uploadedImage = await cloudinary.v2.uploader.upload(file.path);
            createCompDto.imageUrl = uploadedImage.secure_url;
            createCompDto.publicId = uploadedImage.public_id;
        }
        console.log(createCompDto.imageUrl);
        console.log(createCompDto.publicId);
        console.log("heyyyyoo please");
        const user = this.jwtService.decode(access_token);
        const id = user.sub;
        const getUser = await this.userService.findById(id);
        return await this.compService.createComp(createCompDto, getUser);
    }
    async updateCompliance(updateCompDto, id) {
        return await this.compService.updateComp(id, updateCompDto);
    }
    tokenCheck(authorization) {
        const token = authorization.split(" ")[1];
        try {
            const verifyToken = this.jwtService.verifyAsync(token, { secret: process.env.SECRET });
            if (verifyToken) {
                const getUserId = verifyToken["sub"];
                const user = this.userService.findById(getUserId);
                return user;
            }
        }
        catch (err) {
            throw new common_1.UnauthorizedException("Invalid token");
        }
    }
};
__decorate([
    (0, common_1.Post)("/new"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Query)("access_token")),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ComplianceController.prototype, "addCompliance", null);
__decorate([
    (0, common_1.Patch)("/:id/compliance-update"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateComp_1.UpdateCompDto, Number]),
    __metadata("design:returntype", Promise)
], ComplianceController.prototype, "updateCompliance", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ComplianceController.prototype, "tokenCheck", null);
ComplianceController = __decorate([
    (0, common_1.Controller)('compliance'),
    __metadata("design:paramtypes", [compliance_service_1.ComplianceService, jwt_1.JwtService, user_service_1.UserService])
], ComplianceController);
exports.ComplianceController = ComplianceController;
//# sourceMappingURL=compliance.controller.js.map