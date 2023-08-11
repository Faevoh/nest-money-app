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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const userEntity_entity_1 = require("../Entities/userEntity.entity");
const wallet_service_1 = require("../wallet/wallet.service");
const uuid_1 = require("uuid");
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
        try {
            const { firstName, lastName, email, password, accountType } = createUserDto;
            const userExist = await this.userRepo.findOneBy({ email });
            if (userExist) {
                throw new common_1.BadRequestException("User Exists Already");
            }
            const hashed = await bcrypt.hash(password, 10);
            const salt = bcrypt.getSalt(hashed);
            const data = new userEntity_entity_1.User();
            data.firstName = firstName;
            data.lastName = lastName;
            data.email = email;
            data.password = hashed;
            data.accountType = accountType;
            data.accountName = `${data.lastName} ${data.firstName}`;
            data.verified = false;
            data.verifyToken = (0, uuid_1.v4)();
            data.createDate = new Date();
            data.updateDate = new Date();
            if (data.accountType === 'Business') {
                data.status = true;
            }
            await this.userRepo.save(data);
            await this.walletService.newWallet(data);
            delete data.phoneNumber;
            delete data.sex;
            delete data.imageurl;
            delete data.resetToken;
            delete data.resetTokenExpiry;
            const verifyLink = `https://moneyapp-oj7v.onrender.com/api/user/verify/${data.verifyToken}`;
            const verify = `https://marco-lyart.vercel.app/#/verify/${data.verifyToken}`;
            const text = ` Welcome to Money App,
            Thank you for signing up.
            Kindly click on the link to verify your email`;
            const link = `${verify}`;
            await this.mailService.VerifyMail(text, link, data);
            return { statusCode: 201, message: "User successfully Created" };
        }
        catch (err) {
            console.log(err.message);
            if (err instanceof common_1.BadRequestException) {
                throw new common_1.BadRequestException(err.message);
            }
            throw new common_1.InternalServerErrorException("Something went wrong, User not Created");
        }
    }
    async login(email) {
        return await this.userRepo.findOneBy({ email });
    }
    async findById(id) {
        return await this.userRepo.findOneBy({ id });
    }
    async findIdWithRelations(id) {
        const user = await this.userRepo.findOne({
            where: { id },
            relations: ["compliance", "wallet", "transaction", "bankPin"]
        });
        const usrDto = {
            user: user,
            compliance: user.compliance,
            wallet: user.wallet,
            transaction: user.transaction.map(Transaction => {
                const { CVV, accountNumber, cardNumber, expiryDate, phoneNumber, serviceNetwork } = Transaction, others = __rest(Transaction, ["CVV", "accountNumber", "cardNumber", "expiryDate", "phoneNumber", "serviceNetwork"]);
                return others;
            })
        };
        return usrDto;
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
    async update(id, dataToUpdate) {
        const getid = await this.userRepo.findOneBy({ id });
        if (!getid) {
            throw new common_1.NotFoundException("user not found");
        }
        Object.assign(getid, dataToUpdate);
        return await this.userRepo.save(getid);
    }
    async findByToken(resetToken) {
        return await this.userRepo.findOneBy({ resetToken });
    }
    async allUser() {
        return await this.userRepo.find({
            relations: ["compliance", "wallet", "transaction", "bankPin"]
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
    async findByVerifyToken(verifyToken) {
        return await this.userRepo.findOneBy({ verifyToken });
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