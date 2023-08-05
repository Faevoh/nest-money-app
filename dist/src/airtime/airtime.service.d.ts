import { CreateAirtimeDto } from 'src/DTO/createAirtime';
import { Airtime } from 'src/Entities/airtimeEntity.entity';
import { Wallet } from 'src/Entities/walletEntity.entity';
import { Repository } from 'typeorm';
export declare class AirtimeService {
    private airtimeRepo;
    constructor(airtimeRepo: Repository<Airtime>);
    recharge(createAirtimeDto: CreateAirtimeDto, wallet: Wallet): Promise<Airtime>;
    allRecharge(userId: number): Promise<Airtime>;
}
