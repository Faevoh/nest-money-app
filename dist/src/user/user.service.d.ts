import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/DTO/createUser';
import { User } from 'src/Entities/userEntity.entity';
import { UpdateUserDto } from 'src/DTO/updateUser';
import { WalletService } from 'src/wallet/wallet.service';
import { accountGenerator } from "../auth/generator.service";
import { MailService } from 'src/mail/mail.service';
import { BankPin } from 'src/Entities/pinCreation';
import { UserPinDto } from 'src/DTO/pindto';
export declare class UserService {
    private userRepo;
    private walletService;
    private jwtService;
    private acctService;
    private mailService;
    private pinRepo;
    constructor(userRepo: Repository<User>, walletService: WalletService, jwtService: JwtService, acctService: accountGenerator, mailService: MailService, pinRepo: Repository<BankPin>);
    register(createUserDto: CreateUserDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    login(email: string): Promise<User>;
    findById(id: number): Promise<User>;
    findIdWithRelations(id: number): Promise<User[]>;
    findByAccountType(accountType: any): Promise<User>;
    findByEmail(email: string): Promise<User>;
    saveUser(user: User): Promise<User>;
    update(id: number, dataToUpdate: Partial<User>): Promise<User>;
    findByToken(resetToken: string): Promise<User>;
    allUser(): Promise<User[]>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    findByVerifyToken(verifyToken: string): Promise<User>;
    updateStatus(id: number, verified: boolean): Promise<import("typeorm").UpdateResult>;
    createPin(userPinDto: UserPinDto): Promise<void>;
}
