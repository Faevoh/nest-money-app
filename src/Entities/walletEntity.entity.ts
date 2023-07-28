import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./userEntity.entity";
import { Transactions } from "./transactionEntity.entity";

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "double",
        scale: 2,
        precision: 20,
        nullable: true,
        default: 0
    })
    accountBalance: number;

    @Column()
    accountNumber: number;

    @Column()
    userId: number;

    @ManyToOne( () => User, (user) => user.wallet)
    user: User;

    @ManyToMany( () => Transactions, (transaction) => transaction.wallet)
    transaction: Transactions;

    @Column()
    @CreateDateColumn()
    createDate: Date;

    @Column()
    @UpdateDateColumn()
    updateDate: Date;
}