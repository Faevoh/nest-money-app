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
exports.LocalStraregy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_local_1 = require("passport-local");
const auth_service_1 = require("./auth.service");
let LocalStraregy = class LocalStraregy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService) {
        super({
            usernameField: "email"
        });
        this.authService = authService;
    }
    async validate(email, password) {
        try {
            const user = await this.authService.validateUser(email, password);
            return user;
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException) {
                throw new common_1.UnauthorizedException("Invalid User");
            }
            if (err instanceof common_1.UnauthorizedException) {
                throw new common_1.UnauthorizedException("Wrong User Credentials");
            }
            if (err instanceof common_1.BadRequestException) {
                throw new common_1.UnauthorizedException("Check email and verify account before sign in");
            }
            throw err;
        }
    }
};
LocalStraregy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], LocalStraregy);
exports.LocalStraregy = LocalStraregy;
//# sourceMappingURL=local.strategy.js.map