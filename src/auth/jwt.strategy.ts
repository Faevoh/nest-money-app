import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { config } from "dotenv";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";

config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET
        })
    }
    
    async validate(payload) {
        return{
            id: payload.sub,
            email: payload.email
        }
    }
}
