import { User } from "./userEntity.entity";
import { Wallet } from "./walletEntity.entity";
export declare class Transactions {
    push(): void;
    map(arg0: (Transaction: any) => void): void;
    id: number;
    accountNumber: string;
    amount: number;
    narration: string;
    transactionRef: string;
    cardNumber: string;
    expiryDate: string;
    senderName: string;
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
