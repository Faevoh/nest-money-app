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

    // async credit(transferDto: TransferDto, user: User) {
    //     const prefix = 'REF';
    //     const timestamp = Date.now().toString();
    //     const fillString = uuidv4();
    //     const randomNum = Math.floor(Math.random() * 10000).toString().padStart(50, fillString);
    //     const result =  `${prefix}-${timestamp}-${randomNum}`

    //     const {accountNumber, narration, amount} = transferDto;
    //     const newData = new Transactions();
    //     newData.accountNumber = accountNumber;
    //     newData.narration = narration;
    //     newData.amount = amount;
    //     newData.transactionRef = result;
    //     newData.user = user;
    //     console.log("user", user)
    //     newData.userId = user.id;
    //     console.log("userid", user.id)

    //     const data = await this.transRepo.create(newData)
    //    return await this.transRepo.save(data)
    // }

    async transaction(data: Partial<Transactions>) {
        const prefix = 'REF';
        const timestamp = Date.now().toString();
        const fillString = uuidv4();
        const randomNum = Math.floor(Math.random() * 10000).toString().padStart(50, fillString);
        const result =  `${prefix}-${timestamp}-${randomNum}`

        data.transactionRef = result;
        return this.transRepo.save(data);
    }

    // async debit(transaction: Transactions, user: User, wallet: Wallet, comp: Compliances) {
    //     const data = await this.transRepo.create(transaction)
    //     // console.log(user)
    //     const prefix = 'REF';
    //     const timestamp = Date.now().toString();
    //     const fillString = uuidv4();
    //     const randomNum = Math.floor(Math.random() * 10000).toString().padStart(50, fillString);
    //     const result =  `${prefix}-${timestamp}-${randomNum}`
    //     // console.log(result)
    //     data.transactionRef =  result;
    //     // const id = await this.userService.findById(user.id)
    //     // console.log(id)
    //     // data.userId = user.id

    //    return await this.transRepo.save(data)
    // }    

    async allTransactions() {
        return await this.transRepo.find();
    }

    async findByUserId(userId: number) {
        return await this.transRepo.findOneBy({userId})
    }

    async findOneTransaction(id: number) {
        return await this.transRepo.findOneBy({id})
    }

}
