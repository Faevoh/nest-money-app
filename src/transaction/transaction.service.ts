import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepositDto } from 'src/DTO/deposit';
import { Transactions } from 'src/Entities/transactionEntity.entity';
import { User } from 'src/Entities/userEntity.entity';
import {v4 as uuidv4} from "uuid"
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Wallet } from 'src/Entities/walletEntity.entity';
import { Compliances } from 'src/Entities/compEntity.entity';
import { TransferDto } from 'src/DTO/transfer';

@Injectable()
export class TransactionService {
    constructor(@InjectRepository(Transactions) private transRepo: Repository<Transactions>,private userService: UserService) {}

    async transaction(data: Partial<Transactions>) {
        const prefix = 'REF';
        const timestamp = Date.now().toString();
        const fillString = uuidv4();
        const randomNum = Math.floor(Math.random() * 10000).toString().padStart(50, fillString);
        const result =  `${prefix}-${timestamp}-${randomNum}`

        data.transactionRef = result;
        return this.transRepo.save(data);
    }

    async allTransactions() {
        return await this.transRepo.find();
    }

    async findByUserId(userId: number) {
        return await this.transRepo.findOneBy({userId})
    }
}
