import { User } from 'src/Entities/userEntity.entity';
import { Wallet } from 'src/Entities/walletEntity.entity';
import { accountGenerator } from 'src/auth/generator.service';
import { Repository } from 'typeorm';
export declare class WalletService {
    private walletRepo;
    private acctService;
    constructor(walletRepo: Repository<Wallet>, acctService: accountGenerator);
    newWallet(user: User): Promise<Wallet>;
    getWallet(): Promise<Wallet[]>;
    findByUserId(userId: number): Promise<Wallet>;
    findById(id: number): Promise<Wallet>;
    saveWallet(wallet: Wallet): Promise<Wallet>;
}
