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
exports.Compliances = void 0;
const typeorm_1 = require("typeorm");
const userEntity_entity_1 = require("./userEntity.entity");
let Compliances = class Compliances {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Compliances.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Compliances.prototype, "BVN", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Compliances.prototype, "NIN", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Compliances.prototype, "accountName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Compliances.prototype, "accountNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Compliances.prototype, "businessDetails", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Compliances.prototype, "bankCode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Compliances.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => userEntity_entity_1.User, (user) => user.compliance),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", userEntity_entity_1.User)
], Compliances.prototype, "user", void 0);
Compliances = __decorate([
    (0, typeorm_1.Entity)()
], Compliances);
exports.Compliances = Compliances;
//# sourceMappingURL=compEntity.entity.js.map