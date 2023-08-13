import { TransactionService } from './transaction.service';
import { WalletService } from 'src/wallet/wallet.service';
import { UserPinDto } from 'src/DTO/pindto';
import { JwtService } from '@nestjs/jwt';
import { TransferDto } from 'src/DTO/transfer';
import { BankpinService } from 'src/bankpin/bankpin.service';
import { DepositDto } from 'src/DTO/deposit';
import { CreateAirtimeDto } from 'src/DTO/createAirtime';
import { UserService } from 'src/user/user.service';
export declare class TransactionController {
    private transactionService;
    private walletService;
    private jwtService;
    private pinService;
    private userService;
    constructor(transactionService: TransactionService, walletService: WalletService, jwtService: JwtService, pinService: BankpinService, userService: UserService);
    transferTransaction(transferDto: TransferDto, userPinDto: UserPinDto, access_token: string, payload: any): Promise<{
        statusCode: number;
        message: string;
    }>;
    depositTransaction(depositDto: DepositDto, access_token: string, payload: any): Promise<{
        statusCode: number;
        message: string;
    }>;
    recharge(createAirtimeDto: CreateAirtimeDto, userPinDto: UserPinDto, access_token: string, payload: any): Promise<{
        statusCode: number;
        message: string;
    }>;
    singleTransaction(access_token: string, payload: any, transactionRef: string): Promise<{
        statusCode: number;
        message: string;
        data: import("../Entities/transactionEntity.entity").Transactions;
    }>;
}
