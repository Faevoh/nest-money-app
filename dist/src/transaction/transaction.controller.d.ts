import { TransactionService } from './transaction.service';
import { User } from 'src/Entities/userEntity.entity';
import { Transactions } from 'src/Entities/transactionEntity.entity';
import { UserService } from 'src/user/user.service';
import { Wallet } from 'src/Entities/walletEntity.entity';
import { WalletService } from 'src/wallet/wallet.service';
import { Compliances } from 'src/Entities/compEntity.entity';
import { ComplianceService } from 'src/compliance/compliance.service';
export declare class TransactionController {
    private transactionService;
    private userService;
    private walletService;
    private compService;
    constructor(transactionService: TransactionService, userService: UserService, walletService: WalletService, compService: ComplianceService);
    depositTransaction(transaction: Transactions, user: User, wallet: Wallet, id: number, walletid: number): Promise<{
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
