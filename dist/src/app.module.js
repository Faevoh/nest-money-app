"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const compliance_module_1 = require("./compliance/compliance.module");
const airtime_module_1 = require("./airtime/airtime.module");
const mail_module_1 = require("./mail/mail.module");
const wallet_module_1 = require("./wallet/wallet.module");
const transaction_module_1 = require("./transaction/transaction.module");
const mail_config_1 = require("./config/mail.config");
const host_data_source_1 = require("../db/host-data-source");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({
                envFilePath: [".env"],
                isGlobal: true
            }), typeorm_1.TypeOrmModule.forRoot(host_data_source_1.hostDataSourceOptions),
            user_module_1.UserModule, auth_module_1.AuthModule, compliance_module_1.ComplianceModule, airtime_module_1.AirtimeModule, mail_module_1.MailModule, config_1.ConfigModule.forRoot({
                isGlobal: true,
                cache: true,
                load: [
                    mail_config_1.default,
                ],
                expandVariables: true,
            }), serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..'),
            }), wallet_module_1.WalletModule, transaction_module_1.TransactionModule, cloudinary_module_1.CloudinaryModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map