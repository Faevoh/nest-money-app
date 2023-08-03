import { Transactions } from 'src/Entities/transactionEntity.entity';
import { User } from 'src/Entities/userEntity.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Wallet } from 'src/Entities/walletEntity.entity';
import { Compliances } from 'src/Entities/compEntity.entity';
import { TransferDto } from 'src/DTO/transfer';
export declare class TransactionService {
    private transRepo;
    private userService;
    constructor(transRepo: Repository<Transactions>, userService: UserService);
    credit(transferDto: TransferDto, user: User, wallet: Wallet): Promise<Transactions>;
    debit(transaction: Transactions, user: User, wallet: Wallet, comp: Compliances): Promise<Transactions>;
    allTransactions(): Promise<Transactions[]>;
    findOneTransaction(id: number): Promise<Transactions>;
}
