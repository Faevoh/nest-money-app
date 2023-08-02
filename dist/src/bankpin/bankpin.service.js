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
exports.BankpinService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pinCreation_1 = require("../Entities/pinCreation");
const bcrypt = require("bcryptjs");
const typeorm_2 = require("typeorm");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
let BankpinService = class BankpinService {
    constructor(pinRepo) {
        this.pinRepo = pinRepo;
    }
    async createPin(user, userPinDto) {
        try {
            const { bankPin } = userPinDto;
            const encrptPin = await bcrypt.hash(bankPin, 10);
            const salt = bcrypt.getSalt(encrptPin);
            const newPin = new pinCreation_1.BankPin();
            newPin.bankPin = encrptPin;
            newPin.userId = user.id;
            newPin.user = user;
            this.pinRepo.create(newPin);
            return await this.pinRepo.save(newPin);
        }
        catch (err) {
            throw err.message;
        }
    }
    async findByPin(bankPin) {
        return await this.pinRepo.findOneBy({ bankPin });
    }
};
BankpinService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pinCreation_1.BankPin)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BankpinService);
exports.BankpinService = BankpinService;
//# sourceMappingURL=bankpin.service.js.map