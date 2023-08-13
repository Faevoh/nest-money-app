import { Compliances } from "./compEntity.entity";
import { Wallet } from "./walletEntity.entity";
import { Transactions } from "./transactionEntity.entity";
import { BankPin } from "./pinCreation";
export declare class User {
    map(arg0: (User: any) => void): void;
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    accountType: "Business" | "Personal";
    status: boolean;
    accountName: string;
    password: string;
    phoneNumber: string;
    sex: string;
    imageurl?: string;
    verified: boolean;
    verifyToken: string;
    createDate: Date;
    updateDate: Date;
    resetToken: string;
    resetTokenExpiry: Date;
    bankPin: BankPin;
    compliance: Compliances;
    wallet: Wallet;
    transaction: Transactions[];
}
