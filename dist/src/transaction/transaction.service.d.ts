import { Transactions } from 'src/Entities/transactionEntity.entity';
import { User } from 'src/Entities/userEntity.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Wallet } from 'src/Entities/walletEntity.entity';
import { Compliances } from 'src/Entities/compEntity.entity';
export declare class TransactionService {
    private transRepo;
    private userService;
    constructor(transRepo: Repository<Transactions>, userService: UserService);
    credit(transaction: Transactions, user: User, wallet: Wallet): Promise<Transactions>;
    debit(transaction: Transactions, user: User, wallet: Wallet, comp: Compliances): Promise<Transactions>;
    allTransactions(): Promise<Transactions[]>;
    findTransaction(transactionType: string): Promise<Transactions[]>;
    findOneTransaction(id: number): Promise<Transactions>;
}
