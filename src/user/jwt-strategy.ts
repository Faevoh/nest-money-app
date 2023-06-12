import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/Entities/userEntity.entity";
import { Repository } from "typeorm";

export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(@InjectRepository(User) private repo: Repository<User>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET
        });
    }

    async validate(payload) {
        return {
            id: payload.sub,
            email: payload.email
        }
    }
}