import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { config } from "dotenv";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";

config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private userService: UserService, private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET
        })
    }
    
    async validate(payload) {
        if(this.authService.checkRevokeToken(payload.jti)) {
            throw new UnauthorizedException("Token has been revoked")
        }

        if(this.isTokenExpired(payload.exp)) {
            throw new UnauthorizedException("Token has expired");
        }

        return{
            id: payload.sub,
            email: payload.email
        }
    }
    private isTokenExpired(expirationTime: number): boolean {
        return Date.now() >= expirationTime * 1000;
    }
}
