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
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const updateComp_1 = require("../DTO/updateComp");
let ComplianceController = class ComplianceController {
    constructor(compService) {
        this.compService = compService;
    }
    async addCompliance(createCompDto, request) {
        const user = request.user;
        return await this.compService.createComp(createCompDto, user);
    }
    async updateCompliance(updateCompDto, id) {
        return await this.compService.updateComp(id, updateCompDto);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("/new"),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createComp_1.CreateCompDto, Object]),
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
ComplianceController = __decorate([
    (0, common_1.Controller)('compliance'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [compliance_service_1.ComplianceService])
], ComplianceController);
exports.ComplianceController = ComplianceController;
//# sourceMappingURL=compliance.controller.js.map