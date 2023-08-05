import { Transactions } from 'src/Entities/transactionEntity.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
export declare class TransactionService {
    private transRepo;
    private userService;
    constructor(transRepo: Repository<Transactions>, userService: UserService);
    transaction(data: Partial<Transactions>): Promise<Partial<Transactions> & Transactions>;
    allTransactions(): Promise<Transactions[]>;
    findByUserId(userId: number): Promise<Transactions>;
}
