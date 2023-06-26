"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const typeorm_1 = require("@nestjs/typeorm");
const userEntity_entity_1 = require("../Entities/userEntity.entity");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("../auth/auth.service");
const jwt_strategy_1 = require("../auth/jwt.strategy");
const compliance_module_1 = require("../compliance/compliance.module");
const mail_service_1 = require("../mail/mail.service");
const wallet_module_1 = require("../wallet/wallet.module");
const generator_service_1 = require("../auth/generator.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([userEntity_entity_1.User]), passport_1.PassportModule, compliance_module_1.ComplianceModule, wallet_module_1.WalletModule, jwt_1.JwtModule.register({
                secret: process.env.SECRET,
                signOptions: {
                    algorithm: "HS512",
                    expiresIn: process.env.EXPIRES_IN
                }
            })],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, mail_service_1.MailService, generator_service_1.accountGenerator],
        exports: [user_service_1.UserService, passport_1.PassportModule]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map