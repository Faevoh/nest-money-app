import { AirtimeService } from './airtime.service';
import { CreateAirtimeDto } from 'src/DTO/createAirtime';
import { Wallet } from 'src/Entities/walletEntity.entity';
import { WalletService } from 'src/wallet/wallet.service';
export declare class AirtimeController {
    private airtimeService;
    private walletService;
    constructor(airtimeService: AirtimeService, walletService: WalletService);
    recharge(createAirtimeDto: CreateAirtimeDto, wallet: Wallet, userId: number): Promise<{
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
