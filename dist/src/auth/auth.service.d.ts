import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<import("../Entities/userEntity.entity").User>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    validateToken(access_token: string): Promise<void>;
}
