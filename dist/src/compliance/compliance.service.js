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
const typeorm_2 = require("typeorm");
let ComplianceService = class ComplianceService {
    constructor(compRepo) {
        this.compRepo = compRepo;
    }
    async createComp(createCompDto, user) {
        try {
            const { BVN, NIN, accountName, accountNumber, accountType, businessDetails, bankCode } = createCompDto;
            const compExists = await this.compRepo.findOneBy({ accountNumber });
            if (compExists) {
                return { statuscode: 400, message: "User with Compliance Exists already", data: null };
            }
            const comp = new compEntity_entity_1.Compliances();
            comp.BVN = BVN;
            comp.NIN = NIN;
            comp.accountName = accountName;
            comp.accountNumber = accountNumber;
            comp.businessDetails = businessDetails;
            comp.bankCode = bankCode;
            comp.accountType = accountType;
            comp.userId = user.id;
            const newComp = this.compRepo.create(comp);
            const result = await this.compRepo.save(newComp);
            console.log(result);
            return { statusCode: 201, message: "Compliance Added", data: result };
        }
        catch (err) {
            throw new common_1.InternalServerErrorException("Something occoured, Compliance not Added");
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
    async findByBankCode(bankCode) {
        return await this.compRepo.findOneBy({ bankCode });
    }
    async findByUserId(userId) {
        return await this.compRepo.findOneBy({ userId });
    }
};
ComplianceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(compEntity_entity_1.Compliances)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ComplianceService);
exports.ComplianceService = ComplianceService;
//# sourceMappingURL=compliance.service.js.map