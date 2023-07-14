import { NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<import("../Entities/userEntity.entity").User | NotFoundException>;
    login(user: any): Promise<{
        statusCode: number;
        message: string;
        access_token: string;
    }>;
    validateToken(access_token: string): Promise<import("../Entities/userEntity.entity").User>;
}
