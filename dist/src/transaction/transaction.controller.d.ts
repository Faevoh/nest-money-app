import { TransactionService } from './transaction.service';
import { User } from 'src/Entities/userEntity.entity';
import { Transactions } from 'src/Entities/transactionEntity.entity';
import { UserService } from 'src/user/user.service';
import { Wallet } from 'src/Entities/walletEntity.entity';
import { WalletService } from 'src/wallet/wallet.service';
import { Compliances } from 'src/Entities/compEntity.entity';
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
    depositTransaction(transferDto: TransferDto, userPinDto: UserPinDto, transaction: Transactions, access_token: string, payload: any): Promise<{
        message: string;
    }>;
    withdrawalTransaction(transaction: Transactions, user: User, wallet: Wallet, comp: Compliances, id: number, walletid: number): Promise<{
        statusCode: number;
        message: string;
        data: Transactions;
    }>;
    DashBoard(userId: number): Promise<void>;
    singleTransaction(id: number): Promise<{
        statusCode: number;
        message: string;
        data: Transactions;
    }>;
}
