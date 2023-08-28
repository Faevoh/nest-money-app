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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const createUser_1 = require("../DTO/createUser");
const local_auth_guard_1 = require("../auth/local.auth.guard");
const auth_service_1 = require("../auth/auth.service");
const updateUser_1 = require("../DTO/updateUser");
const forgotPassword_1 = require("../DTO/forgotPassword");
const uuid_1 = require("uuid");
const mail_service_1 = require("../mail/mail.service");
const resetPassword_1 = require("../DTO/resetPassword");
const bcrypt = require("bcryptjs");
const generator_service_1 = require("../auth/generator.service");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const jwt_1 = require("@nestjs/jwt");
const changePassword_1 = require("../DTO/changePassword");
const platform_express_1 = require("@nestjs/platform-express");
const pindto_1 = require("../DTO/pindto");
const bankpin_service_1 = require("../bankpin/bankpin.service");
const dotenv_1 = require("dotenv");
const wallet_service_1 = require("../wallet/wallet.service");
const changePin_1 = require("../DTO/changePin");
(0, dotenv_1.config)();
let UserController = class UserController {
    constructor(userService, mailService, authService, acctService, jwtService, cloudinaryService, bankPinservice, walletService) {
        this.userService = userService;
        this.mailService = mailService;
        this.authService = authService;
        this.acctService = acctService;
        this.jwtService = jwtService;
        this.cloudinaryService = cloudinaryService;
        this.bankPinservice = bankPinservice;
        this.walletService = walletService;
    }
    async registerUser(createUserDto) {
        return this.userService.register(createUserDto);
    }
    async emailVerification(verifyToken) {
        try {
            const check = await this.userService.findByVerifyToken(verifyToken);
            if (!check) {
                throw new common_1.UnauthorizedException("Invalid verification link");
            }
            await this.userService.updateStatus(check.id, true);
            return { statuscode: 200, message: "You have been verified" };
        }
        catch (err) {
            if (err instanceof common_1.UnauthorizedException) {
                throw new common_1.UnauthorizedException(err.message);
            }
        }
    }
    login(req) {
        return this.authService.login(req.user);
    }
    getAll() {
        return this.userService.allUser();
    }
    async getUser(access_token, payload) {
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
            const id = tokenDecode.sub;
            const userObject = await this.userService.findIdWithRelations(id);
            return { statusCode: 200, message: `success, id ${id}`, data: userObject };
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(err.message);
            }
            if (err instanceof common_1.UnauthorizedException) {
                throw new common_1.UnauthorizedException(err.message);
            }
        }
    }
    async updateUser(access_token, updateUserDto, payload, file) {
        try {
            const { imageurl } = updateUserDto;
            if (file) {
                const uploadedImage = await this.cloudinaryService.uploadImage(file, 'image', 'IMAGE');
                updateUserDto.imageurl = uploadedImage.secure_url;
            }
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
            const id = tokenDecode.sub;
            const updatedUser = await this.userService.update(id, updateUserDto);
            return { statusCode: 200, message: "success", user: updatedUser };
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(err.message);
            }
            if (err instanceof common_1.UnauthorizedException) {
                throw new common_1.UnauthorizedException(err.message);
            }
            throw new common_1.UnauthorizedException("Cannot update");
        }
    }
    async recoverPassword(forgotPasswordDto) {
        try {
            const { email } = forgotPasswordDto;
            const checkUser = await this.userService.findByEmail(email);
            if (!checkUser) {
                throw new common_1.NotFoundException("Email does not exist");
            }
            const checkVerified = checkUser.verified;
            if (checkVerified === false) {
                throw new common_1.BadRequestException("Account not verified");
            }
            const resetToken = (0, uuid_1.v4)();
            checkUser.resetToken = resetToken;
            checkUser.resetTokenExpiry = new Date(Date.now() + 3600000);
            await this.userService.saveUser(checkUser);
            const text = `${resetToken}`;
            await this.mailService.sendMail(text, checkUser);
            return { statusCode: 201, message: "An Email has been sent to you" };
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException) {
                throw new common_1.BadRequestException(err.message);
            }
            throw new common_1.BadRequestException("Failed to Send Email");
        }
    }
    async resetPassword(resetToken, resetPasswordDto) {
        try {
            const { password } = resetPasswordDto;
            const checkUser = await this.userService.findByToken(resetToken);
            if (!checkUser) {
                throw new common_1.NotFoundException("User token is invalid");
            }
            const hashed = await bcrypt.hash(password, 10);
            checkUser.password = hashed;
            checkUser.resetToken = null;
            checkUser.resetTokenExpiry = null;
            await this.userService.update(checkUser.id, { password: checkUser.password, resetToken: null, resetTokenExpiry: null });
            return { statusCode: 201, message: "New Password saved" };
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException) {
                throw new common_1.BadRequestException(err.message);
            }
            throw new common_1.BadRequestException("Failed to reset Password");
        }
    }
    async changePassword(access_token, payload, changePasswordDto) {
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
            const id = tokenDecode.sub;
            const user = await this.userService.findById(id);
            const { oldPassword, newPassword } = changePasswordDto;
            const checkOldPassword = await bcrypt.compare(oldPassword, user.password);
            if (!checkOldPassword) {
                throw new common_1.UnauthorizedException("Incorrect Password");
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await this.userService.update(user.id, { password: user.password });
            return { statusCode: 200, message: "Password has been changed" };
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(err.message);
            }
            if (err instanceof common_1.UnauthorizedException) {
                throw new common_1.UnauthorizedException(err.message);
            }
            throw new common_1.BadRequestException("Failed to change Password");
        }
    }
    async confirmPassword(access_token, body, payload) {
        try {
            const userToken = this.jwtService.decode(access_token);
            if (!userToken) {
                throw new common_1.NotFoundException("Invalid Token");
            }
            ;
            payload = userToken;
            const timeInSeconds = Math.floor(Date.now() / 1000);
            if (payload.exp && payload.exp < timeInSeconds) {
                throw new common_1.UnauthorizedException("Token has expired");
            }
            const userid = userToken.sub;
            const user = await this.userService.findById(userid);
            const { password } = body;
            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) {
                throw new common_1.UnauthorizedException("Password is Incorrect");
            }
            else {
                return { statusCode: 201, message: "Password is correct" };
            }
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(err.message);
            }
            if (err instanceof common_1.UnauthorizedException) {
                throw new common_1.UnauthorizedException(err.message);
            }
            throw new common_1.UnauthorizedException(err.message);
        }
    }
    async newPin(access_token, userPinDto, payload) {
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
            const id = tokenDecode.sub;
            const user = await this.userService.findById(id);
            if (user.bankPin == null) {
                const data = await this.bankPinservice.createPin(user, userPinDto);
            }
            else {
                throw new common_1.BadRequestException("You already have a Pin");
            }
            return { statusCode: 201, message: "Pin created" };
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(err.message);
            }
            if (err instanceof common_1.UnauthorizedException) {
                throw new common_1.UnauthorizedException(err.message);
            }
            if (err instanceof common_1.BadRequestException) {
                throw new common_1.BadRequestException(err.message);
            }
            throw new common_1.UnauthorizedException("You already have a pin");
        }
    }
    async confirmPin(access_token, pinDto, payload) {
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
            const { bankPin } = pinDto;
            const id = tokenDecode.sub;
            const user = await this.bankPinservice.findByUserId(id);
            const pinDecode = await bcrypt.compare(bankPin, user.bankPin);
            if (!pinDecode) {
                throw new common_1.UnauthorizedException("Invalid Pin");
            }
            return { statusCode: 201, message: "Pin is correct" };
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(err.message);
            }
            if (err instanceof common_1.UnauthorizedException) {
                throw new common_1.UnauthorizedException(err.message);
            }
            throw err.message;
        }
    }
    async changePin(access_token, payload, changePinDto) {
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
            const id = tokenDecode.sub;
            const user = await this.bankPinservice.findByUserId(id);
            const { oldPin, newPin } = changePinDto;
            const checkOldPassword = await bcrypt.compare(oldPin, user.bankPin);
            if (!checkOldPassword) {
                throw new common_1.UnauthorizedException("Incorrect Password");
            }
            const hashedPassword = await bcrypt.hash(newPin, 10);
            user.bankPin = hashedPassword;
            await this.bankPinservice.update(user.id, { bankPin: user.bankPin });
            return { statusCode: 200, message: "Password has been changed" };
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(err.message);
            }
            if (err instanceof common_1.UnauthorizedException) {
                throw new common_1.UnauthorizedException(err.message);
            }
            throw new common_1.BadRequestException("Failed to change Password");
        }
    }
    async getAccountName(body) {
        try {
            const { accountNumber } = body;
            const data = await this.walletService.findByAccountNumber(accountNumber);
            if (!data || data === undefined) {
                throw new common_1.NotFoundException("Account Not Found");
            }
            const user = await this.userService.findById(data.userId);
            if (!user) {
                throw new common_1.NotFoundException("Account Not Found");
            }
            return { statusCode: 200, message: "User Account Name", accountName: user.accountName };
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(err.message);
            }
            throw err.message;
        }
    }
    async logOut(access_token) {
        const user_token = access_token.split(" ")[1];
        await this.authService.revokeToken(user_token);
        return { statusCode: 201, message: "Logged Out Successfully" };
    }
};
__decorate([
    (0, common_1.Post)("/register"),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Patch)("/verify/:verifyToken"),
    __param(0, (0, common_1.Param)("verifyToken")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "emailVerification", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("/profile"),
    __param(0, (0, common_1.Query)("access_token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Patch)("/profile-update"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Query)("access_token")),
    __param(1, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateUser_1.UpdateUserDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Post)("/recover-password"),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgotPassword_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "recoverPassword", null);
__decorate([
    (0, common_1.Post)("/reset-password/:resetToken"),
    __param(0, (0, common_1.Param)("resetToken")),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, resetPassword_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Patch)("/change-password"),
    __param(0, (0, common_1.Query)("access_token")),
    __param(2, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, changePassword_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)("/confirm-password"),
    __param(0, (0, common_1.Query)("access_token")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "confirmPassword", null);
__decorate([
    (0, common_1.Post)("/bankpin"),
    __param(0, (0, common_1.Query)("access_token")),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pindto_1.UserPinDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "newPin", null);
__decorate([
    (0, common_1.Post)("/pin"),
    __param(0, (0, common_1.Query)("access_token")),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pindto_1.UserPinDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "confirmPin", null);
__decorate([
    (0, common_1.Patch)("/change-pin"),
    __param(0, (0, common_1.Query)("access_token")),
    __param(2, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, changePin_1.ChangePinDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePin", null);
__decorate([
    (0, common_1.Post)("/accountName"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAccountName", null);
__decorate([
    (0, common_1.Post)("/logout"),
    __param(0, (0, common_1.Query)("access_token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logOut", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService, mail_service_1.MailService, auth_service_1.AuthService, generator_service_1.accountGenerator, jwt_1.JwtService, cloudinary_service_1.CloudinaryService, bankpin_service_1.BankpinService, wallet_service_1.WalletService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map