/// <reference types="multer" />
import { UserService } from './user.service';
import { CreateUserDto } from 'src/DTO/createUser';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from 'src/DTO/updateUser';
import { ForgotPasswordDto } from 'src/DTO/forgotPassword';
import { MailService } from 'src/mail/mail.service';
import { ResetPasswordDto } from 'src/DTO/resetPassword';
import { accountGenerator } from 'src/auth/generator.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from 'src/DTO/changePassword';
import { UserPinDto } from 'src/DTO/pindto';
import { BankpinService } from 'src/bankpin/bankpin.service';
import { WalletService } from 'src/wallet/wallet.service';
import { ChangePinDto } from 'src/DTO/changePin';
export declare class UserController {
    private userService;
    private mailService;
    private authService;
    private acctService;
    private jwtService;
    private cloudinaryService;
    private bankPinservice;
    private walletService;
    constructor(userService: UserService, mailService: MailService, authService: AuthService, acctService: accountGenerator, jwtService: JwtService, cloudinaryService: CloudinaryService, bankPinservice: BankpinService, walletService: WalletService);
    registerUser(createUserDto: CreateUserDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    emailVerification(verifyToken: string): Promise<{
        statuscode: number;
        message: string;
    }>;
    login(req: any): Promise<{
        statusCode: number;
        message: string;
        access_token: string;
    }>;
    getAll(): Promise<import("../Entities/userEntity.entity").User[]>;
    getUser(access_token: string, payload: any): Promise<{
        statusCode: number;
        message: string;
        data: {
            user: {
                id: number;
                firstName: string;
                lastName: string;
                email: string;
                accountType: "Business" | "Personal";
                accountName: string;
                phoneNumber: string;
                sex: string;
                imageurl: string;
                verified: boolean;
                verifyToken: string;
                status: boolean;
            };
            compliance: import("../Entities/compEntity.entity").Compliances;
            wallet: import("../Entities/walletEntity.entity").Wallet;
            transaction: {
                id: number;
                amount: number;
                narration: string;
                transactionRef: string;
                senderName: string;
                recieverName: string;
                status: string;
                payMethod: string;
                createDate: Date;
                updateDate: Date;
                userId: number;
                user: import("../Entities/userEntity.entity").User;
                wallet: import("../Entities/walletEntity.entity").Wallet;
            }[];
            bankPin: import("../Entities/pinCreation").BankPin;
        };
    }>;
    updateUser(access_token: string, updateUserDto: UpdateUserDto, payload: any, file: Express.Multer.File): Promise<{
        statusCode: number;
        message: string;
        user: import("../Entities/userEntity.entity").User;
    }>;
    recoverPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    resetPassword(resetToken: string, resetPasswordDto: ResetPasswordDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    changePassword(access_token: string, payload: any, changePasswordDto: ChangePasswordDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    confirmPassword(access_token: string, body: {
        password: string;
    }, payload: any): Promise<{
        statusCode: number;
        message: string;
    }>;
    newPin(access_token: string, userPinDto: UserPinDto, payload: any): Promise<{
        statusCode: number;
        message: string;
    }>;
    confirmPin(access_token: string, pinDto: UserPinDto, payload: any): Promise<{
        statusCode: number;
        message: string;
    }>;
    changePin(access_token: string, payload: any, changePinDto: ChangePinDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    getAccountName(body: {
        accountNumber: string;
    }): Promise<{
        statusCode: number;
        message: string;
        accountName: string;
    }>;
    logOut(access_token: string): Promise<{
        statusCode: number;
        message: string;
    }>;
}
