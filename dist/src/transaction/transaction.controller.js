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
const userEntity_entity_1 = require("../Entities/userEntity.entity");
const transactionEntity_entity_1 = require("../Entities/transactionEntity.entity");
const user_service_1 = require("../user/user.service");
const walletEntity_entity_1 = require("../Entities/walletEntity.entity");
const wallet_service_1 = require("../wallet/wallet.service");
const compEntity_entity_1 = require("../Entities/compEntity.entity");
const compliance_service_1 = require("../compliance/compliance.service");
const pindto_1 = require("../DTO/pindto");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const transfer_1 = require("../DTO/transfer");
const bankpin_service_1 = require("../bankpin/bankpin.service");
let TransactionController = class TransactionController {
    constructor(transactionService, userService, walletService, compService, jwtService, pinService) {
        this.transactionService = transactionService;
        this.userService = userService;
        this.walletService = walletService;
        this.compService = compService;
        this.jwtService = jwtService;
        this.pinService = pinService;
    }
    async depositTransaction(transferDto, userPinDto, transaction, access_token, payload) {
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
        const userData = await this.userService.findById(userId);
        const walletdata = await this.walletService.findByUserId(userId);
        const { bankPin } = userPinDto;
        const user = await this.pinService.findByUserId(userId);
        const pinDecode = await bcrypt.compare(bankPin, user.bankPin);
        if (!pinDecode) {
            throw new common_1.UnauthorizedException("Invalid Pin");
        }
        walletdata.accountBalance -= transferDto.amount;
        const recieverAccount = transferDto.accountNumber;
        await this.walletService.findByUserAcc(recieverAccount);
        console.log(recieverAccount);
        const savedWallet = await this.walletService.saveWallet(walletdata);
        console.log(savedWallet);
        console.log(userData);
        return { message: "Well...?" };
    }
    async withdrawalTransaction(transaction, user, wallet, comp, id, walletid) {
        const userData = await this.userService.findById(id);
        transaction.userId = userData.id;
        const walletdata = await this.walletService.findById(walletid);
        if (walletdata.accountBalance === 0 || walletdata.accountBalance < 0 || walletdata.accountBalance < transaction.amount) {
            throw new common_1.InternalServerErrorException("Insufficient Balance");
        }
        walletdata.accountBalance -= transaction.amount;
        await this.walletService.saveWallet(walletdata);
        const compData = await this.compService.findByUserId(id);
        const maindata = await this.transactionService.debit(transaction, user, wallet, comp);
        return { statusCode: 201, message: "success, Withdrawal Made", data: maindata };
    }
    async DashBoard(userId) {
    }
    async singleTransaction(id) {
        const data = await this.transactionService.findOneTransaction(id);
        return { statusCode: 200, message: "Success", data: data };
    }
};
__decorate([
    (0, common_1.Post)("/deposit"),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(3, (0, common_1.Query)("access_token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transfer_1.TransferDto, pindto_1.UserPinDto, transactionEntity_entity_1.Transactions, String, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "depositTransaction", null);
__decorate([
    (0, common_1.Post)("/withdrawal/:id/:walletid"),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(4, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(5, (0, common_1.Param)("walletid", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transactionEntity_entity_1.Transactions, userEntity_entity_1.User, walletEntity_entity_1.Wallet, compEntity_entity_1.Compliances, Number, Number]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "withdrawalTransaction", null);
__decorate([
    (0, common_1.Get)("/dashboard/:userId"),
    __param(0, (0, common_1.Param)("userId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "DashBoard", null);
__decorate([
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "singleTransaction", null);
TransactionController = __decorate([
    (0, common_1.Controller)('transaction'),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService, user_service_1.UserService, wallet_service_1.WalletService, compliance_service_1.ComplianceService, jwt_1.JwtService, bankpin_service_1.BankpinService])
], TransactionController);
exports.TransactionController = TransactionController;
//# sourceMappingURL=transaction.controller.js.map