import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Compliances } from "./compEntity.entity";
import { Wallet } from "./walletEntity.entity";
import { Transactions } from "./transactionEntity.entity";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    email: string;
 
    //if accountType is false then accountType = personal; if accountType is true then accountType = business
    @Column({default: false}) 
    accountType: boolean;

    @Column({nullable: true})
    accountNumber: string;

    @Column()
    accountName: string;

    @Column()
    password: string;

    @Column({nullable: true})
    phoneNumber: string;

    @Column({default: false})
    verified: boolean;

    @Column()
    verifyToken: string;

    @Column()
    @CreateDateColumn()
    createDate: Date;

    @Column()
    @UpdateDateColumn()
    updateDate: Date;

    @Column()
    changePasswordToken: string;

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