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
exports.Wallet = void 0;
const typeorm_1 = require("typeorm");
const userEntity_entity_1 = require("./userEntity.entity");
const transactionEntity_entity_1 = require("./transactionEntity.entity");
let Wallet = class Wallet {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Wallet.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "double",
        scale: 2,
        precision: 20,
        nullable: true,
        default: 0
    }),
    __metadata("design:type", Number)
], Wallet.prototype, "accountBalance", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Wallet.prototype, "accountNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Wallet.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userEntity_entity_1.User, (user) => user.wallet),
    __metadata("design:type", userEntity_entity_1.User)
], Wallet.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => transactionEntity_entity_1.Transactions, (transaction) => transaction.wallet),
    __metadata("design:type", transactionEntity_entity_1.Transactions)
], Wallet.prototype, "transaction", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Wallet.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Wallet.prototype, "updateDate", void 0);
Wallet = __decorate([
    (0, typeorm_1.Entity)()
], Wallet);
exports.Wallet = Wallet;
//# sourceMappingURL=walletEntity.entity.js.map