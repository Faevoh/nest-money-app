import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPinDto } from 'src/DTO/pindto';
import { BankPin } from 'src/Entities/pinCreation';
import { User } from 'src/Entities/userEntity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BankpinService {
    constructor(@InjectRepository(BankPin) private pinRepo: Repository<BankPin>) {}

    async createPin(user: User, userPinDto: UserPinDto) {
        const newPin = this.pinRepo.create(userPinDto);
        newPin.userId = user.id;
        newPin.user = user;

        return await this.pinRepo.save(newPin);
    }
}
