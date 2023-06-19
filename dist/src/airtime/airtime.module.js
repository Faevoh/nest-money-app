"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirtimeModule = void 0;
const common_1 = require("@nestjs/common");
const airtime_controller_1 = require("./airtime.controller");
const airtime_service_1 = require("./airtime.service");
const typeorm_1 = require("@nestjs/typeorm");
const airtimeEntity_entity_1 = require("../Entities/airtimeEntity.entity");
const wallet_module_1 = require("../wallet/wallet.module");
let AirtimeModule = class AirtimeModule {
};
AirtimeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([airtimeEntity_entity_1.Airtime]), wallet_module_1.WalletModule],
        controllers: [airtime_controller_1.AirtimeController],
        providers: [airtime_service_1.AirtimeService]
    })
], AirtimeModule);
exports.AirtimeModule = AirtimeModule;
//# sourceMappingURL=airtime.module.js.map