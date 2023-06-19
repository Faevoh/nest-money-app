import { Strategy } from "passport-jwt";
import { User } from "src/Entities/userEntity.entity";
import { Repository } from "typeorm";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private repo;
    constructor(repo: Repository<User>);
    validate(payload: any): Promise<{
        id: any;
        email: any;
    }>;
}
export {};
