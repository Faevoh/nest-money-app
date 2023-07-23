import { Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    validate(payload: any): Promise<{
        id: any;
        email: any;
    }>;
    private isTokenExpired;
}
export {};
