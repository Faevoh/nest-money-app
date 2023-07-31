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
exports.BankPin = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const userEntity_entity_1 = require("./userEntity.entity");
let BankPin = class BankPin {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BankPin.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.Length)(4, 4, { message: 'Input 4 numbers' }),
    __metadata("design:type", String)
], BankPin.prototype, "bankPin", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], BankPin.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => userEntity_entity_1.User, (user) => user.bankPin),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", userEntity_entity_1.User)
], BankPin.prototype, "user", void 0);
BankPin = __decorate([
    (0, typeorm_1.Entity)("bankpin")
], BankPin);
exports.BankPin = BankPin;
//# sourceMappingURL=pinCreation.js.map