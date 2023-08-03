import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./userEntity.entity";
import { Wallet } from "./walletEntity.entity";

@Entity()
export class Transactions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    accountNumber: string;

    @Column({ type: 'double', scale: 3, precision: 20, nullable: true })
    amount: number;

    @Column({nullable: true})
    narration: string;

    @Column()
    transactionRef: string;

    @Column({nullable: true})
    cardNumber: string;

    @Column({nullable: true})
    expiryDate: string;

    @Column({nullable: true})
    CVV: string;

    @Column()
    userId: number;

    @ManyToOne( () => User, (user) => user.transaction)
    user: User;

    @ManyToMany( () => Wallet, (wallet) => wallet.transaction)
    wallet: Wallet;
}