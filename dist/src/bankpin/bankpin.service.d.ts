import { BankPin } from 'src/Entities/pinCreation';
import { User } from 'src/Entities/userEntity.entity';
import { Repository } from 'typeorm';
export declare class BankpinService {
    private pinRepo;
    constructor(pinRepo: Repository<BankPin>);
    createPin(user: User): Promise<BankPin>;
}
