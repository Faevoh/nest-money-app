import { User } from "./userEntity.entity";
import { Wallet } from "./walletEntity.entity";
export declare class Transactions {
    id: number;
    accountNumber: string;
    amount: number;
    narration: string;
    transactionRef: string;
    cardNumber: string;
    expiryDate: string;
    CVV: string;
    phoneNumber: string;
    serviceNetwork: string;
    status: string;
    payMethod: string;
    createDate: Date;
    updateDate: Date;
    userId: number;
    user: User;
    wallet: Wallet;
}
