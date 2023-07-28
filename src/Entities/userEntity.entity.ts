import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Compliances } from "./compEntity.entity";
import { Wallet } from "./walletEntity.entity";
import { Transactions } from "./transactionEntity.entity";
import { AccountType } from "./accountEntity.entity";

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
 
    @OneToOne(type => AccountType, { cascade: true})
    @JoinColumn()
    accountType: AccountType;

    @Column()
    accountName: string;

    @Column()
    password: string;

    @Column({nullable: true})
    phoneNumber: string;

    @Column({nullable: true})
    sex: string;
    
    @Column({nullable: true})
    imageurl ?: string;

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
    token: string;

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

    get status(): boolean {
      return this.accountType.type === 'business';
    }
}