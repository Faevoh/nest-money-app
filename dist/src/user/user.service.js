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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const userEntity_entity_1 = require("../Entities/userEntity.entity");
const wallet_service_1 = require("../wallet/wallet.service");
const generator_service_1 = require("../auth/generator.service");
const mail_service_1 = require("../mail/mail.service");
let UserService = class UserService {
    constructor(userRepo, walletService, jwtService, acctService, mailService) {
        this.userRepo = userRepo;
        this.walletService = walletService;
        this.jwtService = jwtService;
        this.acctService = acctService;
        this.mailService = mailService;
    }
    async register(createUserDto) {
        console.log("A");
        try {
            return { statusCode: 201, message: "User successfully Created" };
        }
        catch (err) {
            console.log(err.message);
            throw new common_1.InternalServerErrorException("Something went wrong, User not Created");
        }
    }
    async login(email) {
        return await this.userRepo.findOneBy({ email });
    }
    async findById(id) {
        return await this.userRepo.findOneBy({ id });
    }
    async findByAccountType(accountType) {
        return await this.userRepo.findOneBy({ accountType });
    }
    async findByEmail(email) {
        return await this.userRepo.findOneBy({ email });
    }
    async saveUser(user) {
        return this.userRepo.save(user);
    }
    async update(id, data) {
        return await this.userRepo.update(id, data);
    }
    async findByToken(resetToken) {
        return await this.userRepo.findOneBy({ resetToken });
    }
    async deleteUser(id) {
        const deleteuser = await this.findById(id);
        const result = await this.userRepo.delete(deleteuser);
        if (result.affected === 0) {
            throw new common_1.NotFoundException("User was not Deleted");
        }
        else {
            return { success: true, message: "Sucessfully deleted" };
        }
    }
    async allUser() {
        return await this.userRepo.find({
            relations: ["compliance", "wallet", "transaction"]
        });
    }
    async updateUser(id, updateUserDto) {
        try {
            const userUpdate = await this.userRepo.findOneBy({ id });
            if (!userUpdate) {
                throw new Error("User not Found");
            }
            Object.assign(userUpdate, updateUserDto);
            delete userUpdate.password;
            return this.userRepo.save(userUpdate);
        }
        catch (err) {
            throw new common_1.NotFoundException("User not found, update not processed");
        }
    }
    async findByEmailAndVerifyToken(email, verifyToken) {
        return await this.userRepo.findOneBy({ email, verifyToken });
    }
    async updateStatus(id, verified) {
        return this.userRepo.update(id, { verified });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(userEntity_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository, wallet_service_1.WalletService, jwt_1.JwtService, generator_service_1.accountGenerator, mail_service_1.MailService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map