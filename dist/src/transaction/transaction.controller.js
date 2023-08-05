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
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const transaction_service_1 = require("./transaction.service");
const user_service_1 = require("../user/user.service");
const wallet_service_1 = require("../wallet/wallet.service");
const compliance_service_1 = require("../compliance/compliance.service");
const pindto_1 = require("../DTO/pindto");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const transfer_1 = require("../DTO/transfer");
const bankpin_service_1 = require("../bankpin/bankpin.service");
const deposit_1 = require("../DTO/deposit");
let TransactionController = class TransactionController {
    constructor(transactionService, userService, walletService, compService, jwtService, pinService) {
        this.transactionService = transactionService;
        this.userService = userService;
        this.walletService = walletService;
        this.compService = compService;
        this.jwtService = jwtService;
        this.pinService = pinService;
    }
    async transferTransaction(transferDto, userPinDto, access_token, payload) {
        try {
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
            const userid = tokenDecode.sub;
            const { bankPin } = userPinDto;
            const user = await this.pinService.findByUserId(userid);
            const pinDecode = await bcrypt.compare(bankPin, user.bankPin);
            if (!pinDecode) {
                throw new common_1.UnauthorizedException("Invalid Pin");
            }
            const transferdata = Object.assign(Object.assign({}, transferDto), { userId: userid });
            const walletdata = await this.walletService.findByUserId(userid);
            if (walletdata.accountBalance === 0 || walletdata.accountBalance < 0 || walletdata.accountBalance < transferDto.amount) {
                throw new common_1.BadRequestException("Insufficient Balance can't make transfer");
            }
            const recieverAccount = transferDto.accountNumber;
            const recieverdetails = await this.walletService.findByUserAcc(recieverAccount);
            walletdata.accountBalance -= transferDto.amount;
            recieverdetails.accountBalance += transferDto.amount;
            const savedWallet = await this.walletService.saveWallet(walletdata);
            const saveWallet = await this.walletService.saveWallet(recieverdetails);
            const maindata = await this.transactionService.transaction(transferdata);
            return { statusCode: 201, message: "Transfer has been made", data: maindata };
        }
        catch (err) {
            if (err instanceof common_1.UnauthorizedException) {
                throw new common_1.UnauthorizedException(err.message);
            }
            if (err instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(err.message);
            }
            if (err instanceof common_1.BadRequestException) {
                throw new common_1.BadRequestException(err.message);
            }
            console.log(err.message);
            throw new common_1.BadRequestException("Could not Process Transfer");
        }
    }
    async depositTransaction(depositDto, access_token, payload) {
        try {
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
            const userid = tokenDecode.sub;
            const depositdata = Object.assign(Object.assign({}, depositDto), { userId: userid });
            const walletdata = await this.walletService.findByUserId(userid);
            walletdata.accountBalance += depositDto.amount;
            const savedWallet = await this.walletService.saveWallet(walletdata);
            const maindata = await this.transactionService.transaction(depositdata);
            return { statusCode: 201, message: "Deposit has been made", data: maindata };
        }
        catch (err) {
            console.log(err.message);
            if (err instanceof common_1.UnauthorizedException) {
                throw new common_1.UnauthorizedException(err.message);
            }
            if (err instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(err.message);
            }
            throw new common_1.BadRequestException("Could not Process Deposit");
        }
    }
    async singleTransaction(access_token, payload) {
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
        const userid = tokenDecode.sub;
        const data = await this.transactionService.findByUserId(userid);
        return { statusCode: 200, message: "Success", data: data };
    }
};
__decorate([
    (0, common_1.Post)("/transfer"),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(2, (0, common_1.Query)("access_token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transfer_1.TransferDto, pindto_1.UserPinDto, String, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "transferTransaction", null);
__decorate([
    (0, common_1.Post)("/deposit"),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Query)("access_token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deposit_1.DepositDto, String, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "depositTransaction", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("access_token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "singleTransaction", null);
TransactionController = __decorate([
    (0, common_1.Controller)('transaction'),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService, user_service_1.UserService, wallet_service_1.WalletService, compliance_service_1.ComplianceService, jwt_1.JwtService, bankpin_service_1.BankpinService])
], TransactionController);
exports.TransactionController = TransactionController;
//# sourceMappingURL=transaction.controller.js.map