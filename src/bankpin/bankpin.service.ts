import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankPin } from 'src/Entities/pinCreation';
import { User } from 'src/Entities/userEntity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BankpinService {
    constructor(@InjectRepository(BankPin) private pinRepo: Repository<BankPin>) {}

    async createPin(user: User) {
        const newPin = this.pinRepo.create();
        newPin.userId = user.id;
        newPin.user = user;
        console.log("this is user" + user.id)
        console.log("this is pin" + newPin )

        return await this.pinRepo.save(newPin);
    }
}
