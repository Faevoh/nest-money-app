import { UserService } from './user.service';
import { CreateUserDto } from 'src/DTO/createUser';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from 'src/DTO/updateUser';
import { ForgotPasswordDto } from 'src/DTO/forgotPassword';
import { MailService } from 'src/mail/mail.service';
import { ResetPasswordDto } from 'src/DTO/resetPassword';
import { accountGenerator } from 'src/auth/generator.service';
import { User } from 'src/Entities/userEntity.entity';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from 'src/DTO/changePassword';
export declare class UserController {
    private userService;
    private mailService;
    private authService;
    private acctService;
    private jwtService;
    constructor(userService: UserService, mailService: MailService, authService: AuthService, acctService: accountGenerator, jwtService: JwtService);
    registerUser(createUserDto: CreateUserDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    emailVerification(verifyToken: string): Promise<"Invalid verification link" | {
        statuscode: number;
        message: string;
    }>;
    login(req: any): Promise<{
        statusCode: number;
        message: string;
        access_token: string;
    }>;
    getAll(): Promise<User[]>;
    getUser(access_token: string, payload: any): Promise<{
        statusCode: number;
        message: string;
        data: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            accountType: "business" | "personal";
            status: boolean;
            accountName: string;
            phoneNumber: string;
            sex: string;
            imageurl?: string;
            verified: boolean;
            createDate: Date;
            updateDate: Date;
            token: string;
            compliance: import("../Entities/compEntity.entity").Compliances;
            wallet: import("../Entities/walletEntity.entity").Wallet;
            transaction: import("../Entities/transactionEntity.entity").Transactions;
        };
    }>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<{
        statusCode: number;
        message: string;
        user: User;
    }>;
    recoverPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    resetPassword(resetToken: string, resetPasswordDto: ResetPasswordDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    changePassword(token: string, changePasswordDto: ChangePasswordDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    logOut(access_token: string): Promise<{
        statusCode: number;
        message: string;
    }>;
}
