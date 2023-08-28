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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactions = void 0;
const typeorm_1 = require("typeorm");
const userEntity_entity_1 = require("./userEntity.entity");
const walletEntity_entity_1 = require("./walletEntity.entity");
let Transactions = class Transactions {
    push() {
        throw new Error('Method not implemented.');
    }
    map(arg0) {
        throw new Error('Method not implemented.');
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Transactions.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Transactions.prototype, "accountNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double', scale: 3, precision: 20, nullable: true }),
    __metadata("design:type", Number)
], Transactions.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Transactions.prototype, "narration", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transactions.prototype, "transactionRef", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Transactions.prototype, "cardNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Transactions.prototype, "expiryDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Transactions.prototype, "senderName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Transactions.prototype, "recieverName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Transactions.prototype, "CVV", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Transactions.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Transactions.prototype, "serviceNetwork", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Transactions.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Transactions.prototype, "payMethod", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Transactions.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Transactions.prototype, "updateDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Transactions.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userEntity_entity_1.User, (user) => user.transaction),
    __metadata("design:type", userEntity_entity_1.User)
], Transactions.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => walletEntity_entity_1.Wallet, (wallet) => wallet.transaction),
    __metadata("design:type", walletEntity_entity_1.Wallet)
], Transactions.prototype, "wallet", void 0);
Transactions = __decorate([
    (0, typeorm_1.Entity)()
], Transactions);
exports.Transactions = Transactions;
//# sourceMappingURL=transactionEntity.entity.js.map