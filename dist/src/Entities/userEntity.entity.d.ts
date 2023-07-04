import { Compliances } from "./compEntity.entity";
import { Wallet } from "./walletEntity.entity";
import { Transactions } from "./transactionEntity.entity";
export declare class User {
    id: number;
    FirstName: string;
    LastName: string;
    email: string;
    accountType: "business" | "personal";
    accountNumber: string;
    accountName: string;
    password: string;
    phoneNumber: string;
    createDate: Date;
    updateDate: Date;
    resetToken: string;
    resetTokenExpiry: Date;
    compliance: Compliances;
    wallet: Wallet;
    transaction: Transactions;
}
