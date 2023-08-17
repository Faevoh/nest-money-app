import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entities/userEntity.entity';
import { Wallet } from 'src/Entities/walletEntity.entity';
import { accountGenerator } from 'src/auth/generator.service';
import { Repository } from 'typeorm';

@Injectable()
export class WalletService {
    constructor(@InjectRepository(Wallet) private walletRepo: Repository<Wallet>, private acctService:accountGenerator ) {}

    async newWallet(user: User) {
        const wallet = this.walletRepo.create();
        wallet.accountNumber = this.acctService.accountnumberGenerator();
        wallet.accountBalance = 0;
        wallet.user = user;
        wallet.userId = user.id

        // console.log(wallet)
        return await this.walletRepo.save(wallet)
    }

    async getWallet() {
        const wallet = await this.walletRepo.find({
            relations: ["user"]
        });
        return wallet;
    }

    async findByAccountNumber(accountNumber: string) {
        const data = await this.walletRepo.findOneBy({accountNumber});
        return data
    }

    async findByUserId (userId: number) {
        return await this.walletRepo.findOneBy({userId})
    }

    async findByUserAcc(accountNumber: string) {
        return await this.walletRepo.findOneBy({accountNumber})
    }

    async findById (id: number) {
        return await this.walletRepo.findOneBy({id})
    }

    async saveWallet(wallet: Wallet): Promise<Wallet> {
        return await this.walletRepo.save(wallet)
    }
}
