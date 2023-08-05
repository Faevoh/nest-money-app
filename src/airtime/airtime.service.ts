import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAirtimeDto } from 'src/DTO/createAirtime';
import { Airtime } from 'src/Entities/airtimeEntity.entity';
import { Wallet } from 'src/Entities/walletEntity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AirtimeService {
    constructor(@InjectRepository(Airtime) private airtimeRepo: Repository<Airtime>) {}

    async recharge (createAirtimeDto: CreateAirtimeDto, wallet: Wallet) {
        try{
            const airtimeRecharge = this.airtimeRepo.create(createAirtimeDto)
            return await this.airtimeRepo.save(airtimeRecharge)
        }catch(err){
            throw new InternalServerErrorException("Something went wrong, Airtime Recharge couldn't process")
        }
    }

    async allRecharge (userId: number) {
        return await this.airtimeRepo.findOneBy({userId})
    }
}