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
exports.ComplianceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const compEntity_entity_1 = require("../Entities/compEntity.entity");
const auth_service_1 = require("../auth/auth.service");
const user_service_1 = require("../user/user.service");
const typeorm_2 = require("typeorm");
let ComplianceService = class ComplianceService {
    constructor(compRepo, authService, userService) {
        this.compRepo = compRepo;
        this.authService = authService;
        this.userService = userService;
    }
    async createComp(createCompDto, user) {
        try {
            const { BVN, NIN, state, LGA, city, businessAddress, businessName, country, address } = createCompDto;
            const checkBVN = await this.compRepo.findOneBy({ BVN });
            if (checkBVN) {
                throw new common_1.BadRequestException("BVN already exists");
            }
            const checkNIN = await this.compRepo.findOneBy({ NIN });
            console.log("NIN", NIN);
            console.log("checkNIN", checkNIN);
            const comp = new compEntity_entity_1.Compliances();
            comp.BVN = BVN;
            comp.NIN = NIN;
            comp.state = state;
            comp.LGA = LGA;
            comp.city = city;
            comp.country = country;
            comp.address = address;
            comp.businessAddress = businessAddress;
            comp.businessName = businessName;
            comp.userId = user.id;
            const userData = await this.userService.findById(user.id);
            if (userData.status === true && (comp.businessAddress === undefined || comp.businessAddress === null || comp.businessName === null || comp.businessName === undefined)) {
                throw new common_1.UnauthorizedException("businessAddress and businessName cannot be empty");
            }
            const newComp = this.compRepo.create(comp);
            newComp.imageUrl = createCompDto.imageUrl;
            newComp.certUrl = createCompDto.certUrl;
            newComp.memoUrl = createCompDto.memoUrl;
            const result = await this.compRepo.save(newComp);
            return { statusCode: 201, message: "Compliance Added", data: result };
        }
        catch (err) {
            if (err instanceof common_1.BadRequestException) {
                throw new common_1.BadRequestException(err.message);
            }
            if (err instanceof common_1.UnauthorizedException) {
                throw new common_1.BadRequestException(err.message);
            }
            throw new common_1.BadRequestException(err.message);
        }
    }
    async updateComp(id, updateCompDto) {
        try {
            const userCompliance = await this.compRepo.findOneBy({ id });
            if (!userCompliance) {
                throw new Error("Compliance not found");
            }
            const newUpdate = Object.assign(Object.assign({}, userCompliance), updateCompDto);
            return this.compRepo.save(newUpdate);
        }
        catch (err) {
            throw new common_1.NotFoundException("Update not processed ");
        }
    }
    async findByUserId(userId) {
        return await this.compRepo.findOneBy({ userId });
    }
};
ComplianceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(compEntity_entity_1.Compliances)),
    __metadata("design:paramtypes", [typeorm_2.Repository, auth_service_1.AuthService, user_service_1.UserService])
], ComplianceService);
exports.ComplianceService = ComplianceService;
//# sourceMappingURL=compliance.service.js.map