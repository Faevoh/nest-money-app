import { TransactionService } from './transaction.service';
import { User } from 'src/Entities/userEntity.entity';
import { Transactions } from 'src/Entities/transactionEntity.entity';
import { UserService } from 'src/user/user.service';
import { Wallet } from 'src/Entities/walletEntity.entity';
import { WalletService } from 'src/wallet/wallet.service';
import { Compliances } from 'src/Entities/compEntity.entity';
import { ComplianceService } from 'src/compliance/compliance.service';
import { JwtService } from '@nestjs/jwt';
export declare class TransactionController {
    private transactionService;
    private userService;
    private walletService;
    private compService;
    private jwtService;
    constructor(transactionService: TransactionService, userService: UserService, walletService: WalletService, compService: ComplianceService, jwtService: JwtService);
    depositTransaction(requestBody: any, user: User, wallet: Wallet, access_token: string, payload: any, id: number, walletid: number): Promise<{
        statusCode: number;
        message: string;
        data: Transactions;
    }>;
    withdrawalTransaction(transaction: Transactions, user: User, wallet: Wallet, comp: Compliances, id: number, walletid: number): Promise<{
        statusCode: number;
        message: string;
        data: Transactions;
    }>;
    DashBoard(userId: number): Promise<{
        accountBalance: number;
        totalTransactions: Transactions[];
        deposits: Transactions[];
        withdrawals: Transactions[];
    }>;
    singleTransaction(id: number): Promise<{
        statusCode: number;
        message: string;
        data: Transactions;
    }>;
}
