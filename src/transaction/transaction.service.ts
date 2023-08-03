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

    async credit(transferDto: TransferDto, user: User) {
        const data = await this.transRepo.create(transferDto)
        // console.log(user)
        const prefix = 'REF';
        const timestamp = Date.now().toString();
        const fillString = uuidv4();
        const randomNum = Math.floor(Math.random() * 10000).toString().padStart(50, fillString);
        const result =  `${prefix}-${timestamp}-${randomNum}`
        // console.log(result)
        data.transactionRef =  result;
        data.userId = user.id
        console.log(data.userId)
        // const id = await this.userService.findById(user.id)
        // console.log(id)
        // data.userId = user.id

       return await this.transRepo.save(data)
    }

    async debit(transaction: Transactions, user: User, wallet: Wallet, comp: Compliances) {
        const data = await this.transRepo.create(transaction)
        // console.log(user)
        const prefix = 'REF';
        const timestamp = Date.now().toString();
        const fillString = uuidv4();
        const randomNum = Math.floor(Math.random() * 10000).toString().padStart(50, fillString);
        const result =  `${prefix}-${timestamp}-${randomNum}`
        // console.log(result)
        data.transactionRef =  result;
        // const id = await this.userService.findById(user.id)
        // console.log(id)
        // data.userId = user.id

       return await this.transRepo.save(data)
    }    

    async allTransactions() {
        return await this.transRepo.find();
    }

    async findOneTransaction(id: number) {
        return await this.transRepo.findOneBy({id})
    }

}
