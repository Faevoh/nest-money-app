import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPinDto } from 'src/DTO/pindto';
import { BankPin } from 'src/Entities/pinCreation';
import { User } from 'src/Entities/userEntity.entity';
import * as crypto from 'crypto-js'
import { Repository } from 'typeorm';
import { config } from 'dotenv';

config();

@Injectable()
export class BankpinService {
    constructor(@InjectRepository(BankPin) private pinRepo: Repository<BankPin>) {}

    async createPin(user: User, userPinDto: UserPinDto) {
        try{
        const {bankPin} = userPinDto;
        if(bankPin) {
            throw new BadRequestException("You already have a Pin")
        }
        const encrptPin = await crypto.AES.encrypt(bankPin, process.env.SECRET).toString();

        const newPin = new BankPin();
        newPin.bankPin = encrptPin;
        newPin.userId = user.id;
        newPin.user = user;
        this.pinRepo.create(newPin)
        return await this.pinRepo.save(newPin);
        }catch(err){
            if(err instanceof BadRequestException){
                throw new BadRequestException(err.message)
            }
        }
    }
    
    async findByPin(bankPin: string) {
        if(!bankPin) {
            throw new BadRequestException("Wrong pin")
        }
        await this.pinRepo.findOneBy({bankPin})
    }
}
