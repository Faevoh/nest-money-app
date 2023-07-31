"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplianceModule = void 0;
const common_1 = require("@nestjs/common");
const compliance_controller_1 = require("./compliance.controller");
const compliance_service_1 = require("./compliance.service");
const typeorm_1 = require("@nestjs/typeorm");
const compEntity_entity_1 = require("../Entities/compEntity.entity");
const jwt_1 = require("@nestjs/jwt");
const user_module_1 = require("../user/user.module");
const user_service_1 = require("../user/user.service");
const userEntity_entity_1 = require("../Entities/userEntity.entity");
const walletEntity_entity_1 = require("../Entities/walletEntity.entity");
const wallet_service_1 = require("../wallet/wallet.service");
const generator_service_1 = require("../auth/generator.service");
const mail_service_1 = require("../mail/mail.service");
const auth_module_1 = require("../auth/auth.module");
const auth_service_1 = require("../auth/auth.service");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const pinCreation_1 = require("../Entities/pinCreation");
let ComplianceModule = class ComplianceModule {
};
ComplianceModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([compEntity_entity_1.Compliances, userEntity_entity_1.User, walletEntity_entity_1.Wallet, pinCreation_1.BankPin]), jwt_1.JwtModule.register({
                secret: process.env.SECRET,
                signOptions: {
                    algorithm: "HS512",
                    expiresIn: process.env.EXPIRES_IN
                }
            }), user_module_1.UserModule, auth_module_1.AuthModule],
        controllers: [compliance_controller_1.ComplianceController],
        providers: [compliance_service_1.ComplianceService, user_service_1.UserService, wallet_service_1.WalletService, generator_service_1.accountGenerator, mail_service_1.MailService, auth_service_1.AuthService, cloudinary_service_1.CloudinaryService
        ],
        exports: [compliance_service_1.ComplianceService]
    })
], ComplianceModule);
exports.ComplianceModule = ComplianceModule;
//# sourceMappingURL=compliance.module.js.map