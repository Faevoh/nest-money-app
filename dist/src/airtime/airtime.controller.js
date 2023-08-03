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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirtimeController = void 0;
const common_1 = require("@nestjs/common");
const airtime_service_1 = require("./airtime.service");
const createAirtime_1 = require("../DTO/createAirtime");
const walletEntity_entity_1 = require("../Entities/walletEntity.entity");
const wallet_service_1 = require("../wallet/wallet.service");
const bankpin_service_1 = require("../bankpin/bankpin.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const pindto_1 = require("../DTO/pindto");
let AirtimeController = class AirtimeController {
    constructor(airtimeService, walletService, pinService, jwtService) {
        this.airtimeService = airtimeService;
        this.walletService = walletService;
        this.pinService = pinService;
        this.jwtService = jwtService;
    }
    async recharge(createAirtimeDto, userPinDto, wallet, access_token, payload) {
        console.log(createAirtimeDto);
        console.log(userPinDto);
        const tokenDecode = this.jwtService.decode(access_token);
        if (!tokenDecode) {
            throw new common_1.NotFoundException("Invalid Token");
        }
        ;
        payload = tokenDecode;
        const timeInSeconds = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < timeInSeconds) {
            throw new common_1.UnauthorizedException("Token has expired");
        }
        const userId = tokenDecode.sub;
        console.log(userId);
        const walletData = await this.walletService.findByUserId(userId);
        const { amount } = createAirtimeDto;
        if (walletData.accountBalance === 0 || walletData.accountBalance < 0 || walletData.accountBalance < amount) {
            throw new common_1.UnauthorizedException("Insufficient Balance, Can't process Airtime");
        }
        walletData.accountBalance -= createAirtimeDto.amount;
        await this.walletService.saveWallet(walletData);
        const { bankPin } = userPinDto;
        const user = await this.pinService.findByUserId(userId);
        console.log(user);
        const pinDecode = await bcrypt.compare(bankPin, user.bankPin);
        if (!pinDecode) {
            throw new common_1.UnauthorizedException("Invalid Pin");
        }
        const newRecharge = await this.airtimeService.recharge(createAirtimeDto, wallet);
        return { statusCode: 201, message: "Success", data: newRecharge };
    }
    async getAll() {
        const allRecharge = await this.airtimeService.allRecharge();
        if (allRecharge.length === 0) {
            return { statusCode: 404, message: "No Recharge transaction has been made" };
        }
        return { statusCode: 200, message: "Success", data: allRecharge };
    }
};
__decorate([
    (0, common_1.Post)("/airtime-recharge"),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(3, (0, common_1.Query)("access_token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createAirtime_1.CreateAirtimeDto, pindto_1.UserPinDto, walletEntity_entity_1.Wallet, String, Object]),
    __metadata("design:returntype", Promise)
], AirtimeController.prototype, "recharge", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AirtimeController.prototype, "getAll", null);
AirtimeController = __decorate([
    (0, common_1.Controller)('airtime'),
    __metadata("design:paramtypes", [airtime_service_1.AirtimeService, wallet_service_1.WalletService, bankpin_service_1.BankpinService, jwt_1.JwtService])
], AirtimeController);
exports.AirtimeController = AirtimeController;
//# sourceMappingURL=airtime.controller.js.map