import { Compliances } from "./compEntity.entity";
import { Wallet } from "./walletEntity.entity";
import { Transactions } from "./transactionEntity.entity";
import { AccountType } from "./accountEntity.entity";
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    accountType: AccountType;
    accountName: string;
    password: string;
    phoneNumber: string;
    sex: string;
    imageurl?: string;
    verified: boolean;
    verifyToken: string;
    createDate: Date;
    updateDate: Date;
    token: string;
    resetToken: string;
    resetTokenExpiry: Date;
    compliance: Compliances;
    wallet: Wallet;
    transaction: Transactions;
}
