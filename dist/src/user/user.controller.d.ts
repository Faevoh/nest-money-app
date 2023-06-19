import { UserService } from './user.service';
import { CreateUserDto } from 'src/DTO/createUser';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from 'src/DTO/updateUser';
import { ForgotPasswordDto } from 'src/DTO/forgotPassword';
import { MailService } from 'src/mail/mail.service';
import { ResetPasswordDto } from 'src/DTO/resetPassword';
export declare class UserController {
    private userService;
    private mailService;
    private authService;
    constructor(userService: UserService, mailService: MailService, authService: AuthService);
    registerUser(createUserDto: CreateUserDto): Promise<{
        statusCode: number;
        message: string;
        data: import("../Entities/userEntity.entity").User;
    }>;
    login(req: any): Promise<{
        data: {
            id: number;
            FirstName: string;
            LastName: string;
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
    removeUser(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
    getAll(): Promise<import("../Entities/userEntity.entity").User[]>;
    getOne(id: number): Promise<{
        statusCode: number;
        message: string;
        data: import("../Entities/userEntity.entity").User;
    }>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<{
        statusCode: number;
        message: string;
        user: import("../Entities/userEntity.entity").User;
    }>;
    recoverPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        statusCode: number;
        message: string;
    }>;
}
