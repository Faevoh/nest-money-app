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
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const walletEntity_entity_1 = require("../Entities/walletEntity.entity");
const generator_service_1 = require("../auth/generator.service");
const typeorm_2 = require("typeorm");
let WalletService = class WalletService {
    constructor(walletRepo, acctService) {
        this.walletRepo = walletRepo;
        this.acctService = acctService;
    }
    async newWallet(user) {
        const wallet = this.walletRepo.create();
        wallet.accountNumber = this.acctService.accountnumberGenerator();
        wallet.accountBalance = 0;
        wallet.user = user;
        wallet.userId = user.id;
        return await this.walletRepo.save(wallet);
    }
    async getWallet() {
        const wallet = await this.walletRepo.find({
            relations: ["user"]
        });
        return wallet;
    }
    async findByUserId(userId) {
        return await this.walletRepo.findOneBy({ userId });
    }
    async findById(id) {
        return await this.walletRepo.findOneBy({ id });
    }
    async saveWallet(wallet) {
        return await this.walletRepo.save(wallet);
    }
};
WalletService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(walletEntity_entity_1.Wallet)),
    __metadata("design:paramtypes", [typeorm_2.Repository, generator_service_1.accountGenerator])
], WalletService);
exports.WalletService = WalletService;
//# sourceMappingURL=wallet.service.js.map