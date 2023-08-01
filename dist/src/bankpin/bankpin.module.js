"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankpinModule = void 0;
const common_1 = require("@nestjs/common");
const bankpin_service_1 = require("./bankpin.service");
const pinCreation_1 = require("../Entities/pinCreation");
const typeorm_1 = require("@nestjs/typeorm");
let BankpinModule = class BankpinModule {
};
BankpinModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([pinCreation_1.BankPin])],
        providers: [bankpin_service_1.BankpinService],
        exports: [bankpin_service_1.BankpinService]
    })
], BankpinModule);
exports.BankpinModule = BankpinModule;
//# sourceMappingURL=bankpin.module.js.map