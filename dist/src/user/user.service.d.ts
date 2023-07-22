import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/DTO/createUser';
import { User } from 'src/Entities/userEntity.entity';
import { UpdateUserDto } from 'src/DTO/updateUser';
import { WalletService } from 'src/wallet/wallet.service';
import { accountGenerator } from "../auth/generator.service";
import { MailService } from 'src/mail/mail.service';
export declare class UserService {
    private userRepo;
    private walletService;
    private jwtService;
    private acctService;
    private mailService;
    constructor(userRepo: Repository<User>, walletService: WalletService, jwtService: JwtService, acctService: accountGenerator, mailService: MailService);
    register(createUserDto: CreateUserDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    login(email: string): Promise<User>;
    findById(id: number): Promise<User>;
    findByAccountType(accountType: any): Promise<User>;
    findByEmail(email: string): Promise<User>;
    checkUserEmail(email: string): Promise<User>;
    saveUser(user: User): Promise<User>;
    update(id: number, data: any): Promise<import("typeorm").UpdateResult>;
    findByToken(resetToken: string): Promise<User>;
    deleteUser(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
    allUser(): Promise<User[]>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    findByEmailAndVerifyToken(email: string, verifyToken: string): Promise<User>;
    updateStatus(id: number, verified: boolean): Promise<import("typeorm").UpdateResult>;
}
