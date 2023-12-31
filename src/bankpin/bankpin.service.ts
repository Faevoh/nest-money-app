import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPinDto } from 'src/DTO/pindto';
import { BankPin } from 'src/Entities/pinCreation';
import { User } from 'src/Entities/userEntity.entity';
import * as bcrypt from 'bcryptjs'
import { Repository } from 'typeorm';
import { config } from 'dotenv';

config();

@Injectable()
export class BankpinService {
    constructor(@InjectRepository(BankPin) private pinRepo: Repository<BankPin>) {}

    async createPin(user: User, userPinDto: UserPinDto) {
        try{
        const {bankPin} = userPinDto;
        const encrptPin = await bcrypt.hash(bankPin, 10);
        const salt = bcrypt.getSalt(encrptPin)
    
        const newPin = new BankPin();
        newPin.bankPin = encrptPin;
        newPin.userId = user.id;
        newPin.user = user;
        this.pinRepo.create(newPin)
        return await this.pinRepo.save(newPin);
        }catch(err){
            throw err.message
        }
    }
    
    async findByPin(bankPin: string) {
        return await this.pinRepo.findOneBy({bankPin})
    }

    async findByUserId(userId: number) {
        return await this.pinRepo.findOneBy({userId})
    }

    async update(userId: number, dataToUpdate: Partial<BankPin>) {
        const getid = await this.pinRepo.findOneBy({userId});

        if(!getid) { throw new NotFoundException("user not found")}

        Object.assign(getid, dataToUpdate);

        return await this.pinRepo.save(getid)
    }
}
