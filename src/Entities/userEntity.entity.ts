import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Compliances } from "./compEntity.entity";
import { Wallet } from "./walletEntity.entity";
import { Transactions } from "./transactionEntity.entity";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    FirstName: string;

    @Column()
    LastName: string;

    @Column({unique: true})
    email: string;
 
    @Column()
    password: string;

    @Column()
    phoneNumber: string;

   @Column()
   @CreateDateColumn()
   createDate: Date;

   @Column()
   @UpdateDateColumn()
   updateDate: Date;

   @Column({ nullable: true })
   resetToken: string;

   @Column({ nullable: true })
   resetTokenExpiry: Date;

   @OneToOne( () => Compliances, (compliance) => compliance.user, {onDelete: "CASCADE"})
   compliance: Compliances;

   @OneToMany( () => Wallet, (wallet) => wallet.user)
   wallet: Wallet;

   @OneToMany( () => Transactions, (transaction) => transaction.user)
   transaction: Transactions;
}