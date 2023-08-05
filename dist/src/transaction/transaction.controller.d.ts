import { TransactionService } from './transaction.service';
import { Transactions } from 'src/Entities/transactionEntity.entity';
import { UserService } from 'src/user/user.service';
import { WalletService } from 'src/wallet/wallet.service';
import { ComplianceService } from 'src/compliance/compliance.service';
import { UserPinDto } from 'src/DTO/pindto';
import { JwtService } from '@nestjs/jwt';
import { TransferDto } from 'src/DTO/transfer';
import { BankpinService } from 'src/bankpin/bankpin.service';
export declare class TransactionController {
    private transactionService;
    private userService;
    private walletService;
    private compService;
    private jwtService;
    private pinService;
    constructor(transactionService: TransactionService, userService: UserService, walletService: WalletService, compService: ComplianceService, jwtService: JwtService, pinService: BankpinService);
    transferTransaction(transferDto: TransferDto, userPinDto: UserPinDto, access_token: string, payload: any): Promise<{
        statusCode: number;
        message: string;
        data: Partial<Transactions> & Transactions;
    }>;
    DashBoard(userId: number): Promise<void>;
    singleTransaction(id: number): Promise<{
        statusCode: number;
        message: string;
        data: Transactions;
    }>;
}
