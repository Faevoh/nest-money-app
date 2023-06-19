import { User } from "./userEntity.entity";
import { Wallet } from "./walletEntity.entity";
export declare class Transactions {
    id: number;
    currency: string;
    amount: number;
    transactionType: string;
    transactionRef: string;
    transactionPin: string;
    userId: number;
    user: User;
    wallet: Wallet;
}
