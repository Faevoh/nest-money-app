import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/DTO/createUser';
import { User } from 'src/Entities/userEntity.entity';
import { UpdateUserDto } from 'src/DTO/updateUser';
import { Wallet } from 'src/Entities/walletEntity.entity';
import { WalletService } from 'src/wallet/wallet.service';
import { accountGenerator } from "../auth/generator.service";
import { MailService } from 'src/mail/mail.service';
import { BankPin } from 'src/Entities/pinCreation';
import { Transactions } from 'src/Entities/transactionEntity.entity';
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
    findIdWithRelations(id: number): Promise<{
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
        wallet: Wallet;
        transaction: {
            id: number;
            amount: number;
            narration: string;
            transactionRef: string;
            senderName: string;
            status: string;
            payMethod: string;
            createDate: Date;
            updateDate: Date;
            userId: number;
            user: User;
            wallet: Wallet;
        }[];
        bankPin: BankPin;
    }>;
    findByAccountType(accountType: any): Promise<User>;
    findByEmail(email: string): Promise<User>;
    saveUser(user: User): Promise<User>;
    update(id: number, dataToUpdate: Partial<User>): Promise<User>;
    findByToken(resetToken: string): Promise<User>;
    allUser(): Promise<User[]>;
    addToUserTransaction(transaction: Transactions, id: number): Promise<void>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    findByVerifyToken(verifyToken: string): Promise<User>;
    updateStatus(id: number, verified: boolean): Promise<import("typeorm").UpdateResult>;
}
