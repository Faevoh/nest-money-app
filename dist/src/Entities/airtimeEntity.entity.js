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
exports.Airtime = void 0;
const typeorm_1 = require("typeorm");
const userEntity_entity_1 = require("./userEntity.entity");
let Airtime = class Airtime {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Airtime.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Airtime.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Airtime.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Airtime.prototype, "serviceNetwork", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Airtime.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userEntity_entity_1.User, (user) => user.airtime),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", userEntity_entity_1.User)
], Airtime.prototype, "user", void 0);
Airtime = __decorate([
    (0, typeorm_1.Entity)()
], Airtime);
exports.Airtime = Airtime;
//# sourceMappingURL=airtimeEntity.entity.js.map