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
exports.AirtimeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const airtimeEntity_entity_1 = require("../Entities/airtimeEntity.entity");
const typeorm_2 = require("typeorm");
let AirtimeService = class AirtimeService {
    constructor(airtimeRepo) {
        this.airtimeRepo = airtimeRepo;
    }
    async recharge(createAirtimeDto, wallet) {
        try {
            const airtimeRecharge = this.airtimeRepo.create(createAirtimeDto);
            return await this.airtimeRepo.save(airtimeRecharge);
        }
        catch (err) {
            throw new common_1.InternalServerErrorException("Something went wrong, Airtime Recharge couldn't process");
        }
    }
    async allRecharge(userId) {
        return await this.airtimeRepo.findOneBy({ userId });
    }
};
AirtimeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(airtimeEntity_entity_1.Airtime)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AirtimeService);
exports.AirtimeService = AirtimeService;
//# sourceMappingURL=airtime.service.js.map