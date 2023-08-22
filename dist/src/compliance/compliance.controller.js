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
const createComp_1 = require("../DTO/createComp");
const updateComp_1 = require("../DTO/updateComp");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const platform_express_1 = require("@nestjs/platform-express");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let ComplianceController = class ComplianceController {
    constructor(compService, jwtService, userService, cloudinaryService) {
        this.compService = compService;
        this.jwtService = jwtService;
        this.userService = userService;
        this.cloudinaryService = cloudinaryService;
    }
    async addCompliance(access_token, createCompDto, ninfile, certfile, memofile, payload) {
        try {
            if (ninfile) {
                const uploadedImage = await this.cloudinaryService.uploadNin(ninfile, 'image', 'NIN');
                createCompDto.imageUrl = uploadedImage.secure_url;
            }
            else {
                console.log("nin not avaliable", "1");
            }
            if (certfile) {
                const uploadedCert = await this.cloudinaryService.uploadCert(certfile, 'image', 'CERT');
                createCompDto.certUrl = uploadedCert.secure_url;
                console.log("2", createCompDto.certUrl);
            }
            else {
                console.log("cert not avaliable", "2");
            }
            if (memofile) {
                const uploadedMemo = await this.cloudinaryService.uploadMemo(memofile, 'raw', 'MEMO');
                createCompDto.memoUrl = uploadedMemo.secure_url;
                console.log("3", createCompDto.memoUrl);
            }
            else {
                console.log("memo not avaliable", "3");
            }
            const user = await this.jwtService.decode(access_token);
            if (!user) {
                throw new common_1.NotFoundException("Invalid Token");
            }
            ;
            payload = user;
            const timeInSeconds = Math.floor(Date.now() / 1000);
            if (payload.exp && payload.exp < timeInSeconds) {
                throw new common_1.UnauthorizedException("Token has expired");
            }
            const id = user.sub;
            const getUser = await this.userService.findById(id);
            const data = await this.compService.createComp(createCompDto, getUser);
            return data;
        }
        catch (err) {
            console.log("4", err.message);
            if (err instanceof common_1.NotFoundException) {
                console.log('5', err.message);
            }
            if (err instanceof common_1.UnauthorizedException) {
                console.log("6", err.message);
            }
        }
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
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('nin')),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('cert')),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('memo')),
    __param(0, (0, common_1.Query)("access_token")),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(2, (0, common_1.UploadedFile)()),
    __param(3, (0, common_1.UploadedFile)()),
    __param(4, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createComp_1.CreateCompDto, Object, Object, Object, Object]),
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
    __metadata("design:paramtypes", [compliance_service_1.ComplianceService, jwt_1.JwtService, user_service_1.UserService, cloudinary_service_1.CloudinaryService])
], ComplianceController);
exports.ComplianceController = ComplianceController;
//# sourceMappingURL=compliance.controller.js.map