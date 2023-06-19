import { User } from 'src/Entities/userEntity.entity';
import { Wallet } from 'src/Entities/walletEntity.entity';
import { Repository } from 'typeorm';
export declare class WalletService {
    private walletRepo;
    constructor(walletRepo: Repository<Wallet>);
    newWallet(user: User): Promise<Wallet>;
    getWallet(): Promise<Wallet[]>;
    findByUserId(userId: number): Promise<Wallet>;
    findById(id: number): Promise<Wallet>;
    saveWallet(wallet: Wallet): Promise<Wallet>;
}
