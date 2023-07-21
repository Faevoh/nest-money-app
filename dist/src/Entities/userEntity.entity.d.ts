import { Compliances } from "./compEntity.entity";
import { Wallet } from "./walletEntity.entity";
import { Transactions } from "./transactionEntity.entity";
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    accountType: boolean;
    accountNumber: string;
    accountName: string;
    password: string;
    phoneNumber: string;
    verified: boolean;
    verifyToken: string;
    createDate: Date;
    updateDate: Date;
    resetToken: string;
    resetTokenExpiry: Date;
    compliance: Compliances;
    wallet: Wallet;
    transaction: Transactions;
}
