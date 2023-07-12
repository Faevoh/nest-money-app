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
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const userEntity_entity_1 = require("../Entities/userEntity.entity");
let UserController = class UserController {
    constructor(userService, mailService, authService, acctService) {
        this.userService = userService;
        this.mailService = mailService;
        this.authService = authService;
        this.acctService = acctService;
    }
    async registerUser(createUserDto) {
        return this.userService.register(createUserDto);
    }
    login(req) {
        return this.authService.login(req.user);
    }
    removeUser(id) {
        return this.userService.deleteUser(id);
    }
    getAll() {
        return this.userService.allUser();
    }
    async getOne(id) {
        const result = await this.userService.findById(id);
        const { resetToken, resetTokenExpiry } = result, others = __rest(result, ["resetToken", "resetTokenExpiry"]);
        return { statusCode: 200, message: `success, data of ${id}`, data: others };
    }
    async updateUser(id, updateUserDto) {
        const updatedUser = await this.userService.updateUser(id, updateUserDto);
        return { statusCode: 200, message: "success", user: updatedUser };
    }
    async recoverPassword(forgotPasswordDto) {
        try {
            const { email } = forgotPasswordDto;
            const checkUser = await this.userService.findByEmail(email);
            if (!checkUser) {
                throw new common_1.BadRequestException("Email does not exist");
            }
            const resetToken = (0, uuid_1.v4)();
            checkUser.resetToken = resetToken;
            checkUser.resetTokenExpiry = new Date(Date.now() + 3600000);
            await this.userService.saveUser(checkUser);
            const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
            const subject = "Password Reset";
            const text = `${resetToken}`;
            await this.mailService.sendMail(text, checkUser);
            return { statusCode: 201, message: "An Email with your token has been sent to you" };
        }
        catch (err) {
            throw new common_1.BadRequestException("Failed to Send Email");
        }
    }
    async resetPassword(resetPasswordDto, users) {
        const { password } = resetPasswordDto;
        const { resetToken } = users;
        const checkUser = await this.userService.findByToken(resetToken);
        if (!checkUser) {
            throw new common_1.NotFoundException("User token is invalid or has expired");
        }
        checkUser.password = password;
        checkUser.resetToken = null;
        checkUser.resetTokenExpiry = null;
        const hashed = await bcrypt.hash(password, 10);
        await this.userService.update(checkUser.id, { password: hashed });
        return { statusCode: 200, message: "New Password saved" };
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
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Delete)("delete/:id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "removeUser", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getOne", null);
__decorate([
    (0, common_1.Patch)("/:id/profile-update"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateUser_1.UpdateUserDto]),
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
    (0, common_1.Post)("/reset-password"),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resetPassword_1.ResetPasswordDto, userEntity_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService, mail_service_1.MailService, auth_service_1.AuthService, generator_service_1.accountGenerator])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map