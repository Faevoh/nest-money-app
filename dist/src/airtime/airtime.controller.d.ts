import { AirtimeService } from './airtime.service';
import { Wallet } from 'src/Entities/walletEntity.entity';
import { WalletService } from 'src/wallet/wallet.service';
import { BankpinService } from 'src/bankpin/bankpin.service';
import { JwtService } from '@nestjs/jwt';
export declare class AirtimeController {
    private airtimeService;
    private walletService;
    private pinService;
    private jwtService;
    constructor(airtimeService: AirtimeService, walletService: WalletService, pinService: BankpinService, jwtService: JwtService);
    recharge(requestBody: any, wallet: Wallet, access_token: string, payload: any): Promise<{
        statusCode: number;
        message: string;
        data: import("../Entities/airtimeEntity.entity").Airtime;
    }>;
    getAll(): Promise<{
        statusCode: number;
        message: string;
        data?: undefined;
    } | {
        statusCode: number;
        message: string;
        data: import("../Entities/airtimeEntity.entity").Airtime[];
    }>;
}
