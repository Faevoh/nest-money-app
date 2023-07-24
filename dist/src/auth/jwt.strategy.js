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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const dotenv_1 = require("dotenv");
const passport_jwt_1 = require("passport-jwt");
const user_service_1 = require("../user/user.service");
const auth_service_1 = require("./auth.service");
(0, dotenv_1.config)();
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(userService, authService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromUrlQueryParameter("access_token"),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET
        });
        this.userService = userService;
        this.authService = authService;
    }
    async validate(payload) {
        const user = await this.userService.findById(payload.sub);
        if (!user) {
            throw new common_1.UnauthorizedException("Invalid token");
        }
        if (this.authService.checkRevokeToken(payload.jti)) {
            throw new common_1.UnauthorizedException("Token has been revoked");
        }
        if (this.isTokenExpired(payload.exp)) {
            throw new common_1.UnauthorizedException("Token has expired");
        }
        return {
            id: payload.sub,
            email: payload.email
        };
    }
    isTokenExpired(expirationTime) {
        return Date.now() >= expirationTime * 1000;
    }
};
JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService, auth_service_1.AuthService])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map