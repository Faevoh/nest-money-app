import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/DTO/createUser';
import { User } from 'src/Entities/userEntity.entity';
import { UpdateUserDto } from 'src/DTO/updateUser';
import { WalletService } from 'src/wallet/wallet.service';
import { accountGenerator } from 'src/auth/generator.service';
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
        data: User;
    }>;
    login(email: string): Promise<User>;
    findById(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    saveUser(user: User): Promise<User>;
    update(id: number, data: any): Promise<import("typeorm").UpdateResult>;
    findByToken(token: string): Promise<User>;
    deleteUser(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
    allUser(): Promise<User[]>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User>;
}
