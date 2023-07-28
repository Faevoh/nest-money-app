import { User } from "./userEntity.entity";
import { Transactions } from "./transactionEntity.entity";
export declare class Wallet {
    id: number;
    accountBalance: number;
    accountNumber: string;
    userId: number;
    user: User;
    transaction: Transactions;
    createDate: Date;
    updateDate: Date;
}
