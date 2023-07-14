import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
declare const LocalStraregy_base: new (...args: any[]) => Strategy;
export declare class LocalStraregy extends LocalStraregy_base {
    private authService;
    constructor(authService: AuthService);
    validate(email: string, password: string): Promise<import("../Entities/userEntity.entity").User | import("@nestjs/common").NotFoundException>;
}
export {};
