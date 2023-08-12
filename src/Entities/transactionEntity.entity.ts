import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./userEntity.entity";
import { Wallet } from "./walletEntity.entity";

@Entity()
export class Transactions {
    push() {
        throw new Error('Method not implemented.');
    }
    map(arg0: (Transaction: any) => void) {
        throw new Error('Method not implemented.');
    }
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
    senderName: string;

    @Column({nullable: true})
    CVV: string;

    @Column({nullable: true})
    phoneNumber: string;

    @Column({nullable: true})
    serviceNetwork: string;

    @Column({nullable: true})
    status: string;

    @Column({nullable: true})
    payMethod: string;

    @Column()
    @CreateDateColumn()
    createDate: Date;

    @Column()
    @UpdateDateColumn()
    updateDate: Date;

    @Column()
    userId: number;

    @ManyToOne( () => User, (user) => user.transaction)
    user: User;

    @ManyToMany( () => Wallet, (wallet) => wallet.transaction)
    wallet: Wallet;
}