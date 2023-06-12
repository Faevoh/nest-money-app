import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./userEntity.entity";
import { Wallet } from "./walletEntity.entity";

@Entity()
export class Transactions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    currency: string;

    @Column({ type: 'double', scale: 3, precision: 20, nullable: true })
    amount: number;

    @Column()
    transactionType: string;

    @Column()
    transactionRef: string;

    @Column({nullable: true})
    transactionPin: string

    @Column()
    userId: number;

    @ManyToOne( () => User, (user) => user.transaction)
    user: User;

    @ManyToMany( () => Wallet, (wallet) => wallet.transaction)
    wallet: Wallet;
}