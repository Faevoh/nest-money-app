import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<import("../Entities/userEntity.entity").User>;
    login(user: any): Promise<{
        data: {
            id: number;
            FirstName: string;
            LastName: string;
            accountType: string;
            phoneNumber: string;
            createDate: Date;
            updateDate: Date;
            resetToken: string;
            resetTokenExpiry: Date;
            compliance: import("../Entities/compEntity.entity").Compliances;
            wallet: import("../Entities/walletEntity.entity").Wallet;
            transaction: import("../Entities/transactionEntity.entity").Transactions;
        };
        access_token: string;
    }>;
}
