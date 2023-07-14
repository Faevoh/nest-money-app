import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStraregy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: "email"
        });
    }

    async validate (email: string, password: string) {
        try{
            const user = await this.authService.validateUser(email, password);
            
            return user;
        }catch(err){
            throw new UnauthorizedException("You are not authorized")
        }
    }
}