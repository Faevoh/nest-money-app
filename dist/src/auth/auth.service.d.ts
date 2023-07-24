import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    private revokedTokens;
    validateUser(email: string, password: string): Promise<import("../Entities/userEntity.entity").User>;
    login(user: any): Promise<{
        statusCode: number;
        message: string;
        access_token: string;
    }>;
    revokeToken(jti: string): Promise<void>;
    checkRevokeToken(access_token: string): boolean;
}
