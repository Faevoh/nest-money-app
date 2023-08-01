import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
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
            if (err instanceof NotFoundException){
                throw new UnauthorizedException("email or password incorrect");
            }
            if (err instanceof UnauthorizedException){
                throw new UnauthorizedException("email or password incorrect");
            }
            if (err instanceof BadRequestException){
                throw new UnauthorizedException("Check email and verify account before sign in")
            }
            throw err;
        }
    }
}