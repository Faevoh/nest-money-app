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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const transactionEntity_entity_1 = require("../Entities/transactionEntity.entity");
const uuid_1 = require("uuid");
const user_service_1 = require("../user/user.service");
const typeorm_2 = require("typeorm");
let TransactionService = class TransactionService {
    constructor(transRepo, userService) {
        this.transRepo = transRepo;
        this.userService = userService;
    }
    async credit(transaction, user, wallet) {
        const data = await this.transRepo.create(transaction);
        const prefix = 'REF';
        const timestamp = Date.now().toString();
        const fillString = (0, uuid_1.v4)();
        const randomNum = Math.floor(Math.random() * 10000).toString().padStart(50, fillString);
        const result = `${prefix}-${timestamp}-${randomNum}`;
        data.transactionRef = result;
        return await this.transRepo.save(data);
    }
    async debit(transaction, user, wallet, comp) {
        const data = await this.transRepo.create(transaction);
        const prefix = 'REF';
        const timestamp = Date.now().toString();
        const fillString = (0, uuid_1.v4)();
        const randomNum = Math.floor(Math.random() * 10000).toString().padStart(50, fillString);
        const result = `${prefix}-${timestamp}-${randomNum}`;
        data.transactionRef = result;
        return await this.transRepo.save(data);
    }
    async allTransactions() {
        return await this.transRepo.find();
    }
    async findTransaction(transactionType) {
        return await this.transRepo.findBy({ transactionType });
    }
    async findOneTransaction(id) {
        return await this.transRepo.findOneBy({ id });
    }
};
TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transactionEntity_entity_1.Transactions)),
    __metadata("design:paramtypes", [typeorm_2.Repository, user_service_1.UserService])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map