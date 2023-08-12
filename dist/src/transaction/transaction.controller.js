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
const wallet_service_1 = require("../wallet/wallet.service");
const pindto_1 = require("../DTO/pindto");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const transfer_1 = require("../DTO/transfer");
const bankpin_service_1 = require("../bankpin/bankpin.service");
const deposit_1 = require("../DTO/deposit");
const createAirtime_1 = require("../DTO/createAirtime");
const user_service_1 = require("../user/user.service");
let TransactionController = class TransactionController {
    constructor(transactionService, walletService, jwtService, pinService, userService) {
        this.transactionService = transactionService;
        this.walletService = walletService;
        this.jwtService = jwtService;
        this.pinService = pinService;
        this.userService = userService;
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
            const users = await this.userService.findById(userid);
            const { bankPin } = userPinDto;
            const user = await this.pinService.findByUserId(userid);
            const pinDecode = await bcrypt.compare(bankPin, user.bankPin);
            if (!pinDecode) {
                throw new common_1.UnauthorizedException("Invalid Pin");
            }
            const transferdata = Object.assign(Object.assign({}, transferDto), { userId: userid, status: "success", payMethod: "transfer" });
            const walletdata = await this.walletService.findByUserId(userid);
            if (walletdata.accountBalance === 0 || walletdata.accountBalance < 0 || walletdata.accountBalance < transferDto.amount) {
                throw new common_1.BadRequestException("Insufficient Balance can't make transfer");
            }
            const recieverAccount = transferDto.accountNumber;
            const recieverdetails = await this.walletService.findByUserAcc(recieverAccount);
            const recieverData = await this.userService.findById(recieverdetails.userId);
            walletdata.accountBalance -= transferDto.amount;
            recieverdetails.accountBalance += transferDto.amount;
            const savedWallet = await this.walletService.saveWallet(walletdata);
            const saveWallet = await this.walletService.saveWallet(recieverdetails);
            const maindata = await this.transactionService.transaction(transferdata);
            delete maindata.CVV;
            delete maindata.cardNumber;
            delete maindata.expiryDate;
            delete maindata.phoneNumber;
            delete maindata.serviceNetwork;
            console.log("1", recieverData.transaction.amount);
            console.log("2", maindata.amount);
            recieverData.transaction.amount = maindata.amount;
            recieverData.transaction.senderName = `${users.lastName} ${users.firstName}`;
            recieverData.transaction.status = "success";
            recieverData.transaction.payMethod = "deposit";
            recieverData.transaction.transactionRef = maindata.transactionRef;
            return { statusCode: 201, message: "Transfer successful" };
        }
        catch (err) {
            console.log(err);
            if (err instanceof common_1.UnauthorizedException) {
                throw new common_1.UnauthorizedException(err.message);
            }
            if (err instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(err.message);
            }
            if (err instanceof common_1.BadRequestException) {
                throw new common_1.BadRequestException(err.message);
            }
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
            const depositdata = Object.assign(Object.assign({}, depositDto), { userId: userid, status: "success", payMethod: "deposit" });
            const walletdata = await this.walletService.findByUserId(userid);
            walletdata.accountBalance += depositDto.amount;
            const savedWallet = await this.walletService.saveWallet(walletdata);
            const maindata = await this.transactionService.transaction(depositdata);
            delete maindata.accountNumber;
            delete maindata.narration;
            delete maindata.CVV;
            delete maindata.cardNumber;
            delete maindata.expiryDate;
            delete maindata.phoneNumber;
            delete maindata.serviceNetwork;
            return { statusCode: 201, message: "Deposit successful" };
        }
        catch (err) {
            if (err instanceof common_1.UnauthorizedException) {
                throw new common_1.UnauthorizedException(err.message);
            }
            if (err instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(err.message);
            }
            throw new common_1.BadRequestException("Could not Process Deposit");
        }
    }
    async recharge(createAirtimeDto, userPinDto, access_token, payload) {
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
            const userId = tokenDecode.sub;
            const airtimedata = Object.assign(Object.assign({}, createAirtimeDto), { userId: userId, status: "success", payMethod: "airtime" });
            const walletData = await this.walletService.findByUserId(userId);
            const { amount } = createAirtimeDto;
            if (walletData.accountBalance === 0 || walletData.accountBalance < 0 || walletData.accountBalance < amount) {
                throw new common_1.UnauthorizedException("Insufficient Balance, Can't process Airtime");
            }
            walletData.accountBalance -= createAirtimeDto.amount;
            await this.walletService.saveWallet(walletData);
            const { bankPin } = userPinDto;
            const user = await this.pinService.findByUserId(userId);
            const pinDecode = await bcrypt.compare(bankPin, user.bankPin);
            if (!pinDecode) {
                throw new common_1.UnauthorizedException("Invalid Pin");
            }
            const newRecharge = await this.transactionService.recharge(airtimedata);
            delete newRecharge.accountNumber;
            delete newRecharge.narration;
            delete newRecharge.CVV;
            delete newRecharge.cardNumber;
            delete newRecharge.expiryDate;
            delete userPinDto.bankPin;
            return { statusCode: 201, message: "Successful Recharge" };
        }
        catch (err) {
            if (err instanceof common_1.UnauthorizedException) {
                throw new common_1.UnauthorizedException(err.message);
            }
            if (err instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(err.message);
            }
            throw new common_1.BadRequestException("Could not Process Airtime");
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
    (0, common_1.Post)("/airtime-recharge"),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(2, (0, common_1.Query)("access_token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createAirtime_1.CreateAirtimeDto, pindto_1.UserPinDto, String, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "recharge", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("access_token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "singleTransaction", null);
TransactionController = __decorate([
    (0, common_1.Controller)('transaction'),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService, wallet_service_1.WalletService, jwt_1.JwtService, bankpin_service_1.BankpinService, user_service_1.UserService])
], TransactionController);
exports.TransactionController = TransactionController;
//# sourceMappingURL=transaction.controller.js.map