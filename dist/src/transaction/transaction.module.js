"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModule = void 0;
const common_1 = require("@nestjs/common");
const transaction_controller_1 = require("./transaction.controller");
const transaction_service_1 = require("./transaction.service");
const typeorm_1 = require("@nestjs/typeorm");
const transactionEntity_entity_1 = require("../Entities/transactionEntity.entity");
const user_module_1 = require("../user/user.module");
const wallet_module_1 = require("../wallet/wallet.module");
const compliance_module_1 = require("../compliance/compliance.module");
const jwt_1 = require("@nestjs/jwt");
const bankpin_service_1 = require("../bankpin/bankpin.service");
const pinCreation_1 = require("../Entities/pinCreation");
const mail_service_1 = require("../mail/mail.service");
let TransactionModule = class TransactionModule {
};
TransactionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([transactionEntity_entity_1.Transactions, pinCreation_1.BankPin]), user_module_1.UserModule, wallet_module_1.WalletModule, compliance_module_1.ComplianceModule],
        controllers: [transaction_controller_1.TransactionController],
        providers: [transaction_service_1.TransactionService, jwt_1.JwtService, bankpin_service_1.BankpinService, mail_service_1.MailService]
    })
], TransactionModule);
exports.TransactionModule = TransactionModule;
//# sourceMappingURL=transaction.module.js.map