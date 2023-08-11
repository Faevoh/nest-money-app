import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Compliances } from "./compEntity.entity";
import { Wallet } from "./walletEntity.entity";
import { Transactions } from "./transactionEntity.entity";
import { BankPin } from "./pinCreation";

@Entity("users")
export class User {
  map(arg0: (User: any) => void) {
      throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({unique: true})
  email: string;

  @Column({default: "Personal"})
  accountType: "Business" | "Personal";

  @Column({default: false})
  status: boolean;

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

  @Column({ nullable: true })
  resetToken: string;

  @Column({ nullable: true })
  resetTokenExpiry: Date;

  @OneToOne( () => BankPin, (bankpin) => bankpin.user)
  bankPin: BankPin;

  @OneToOne( () => Compliances, (compliance) => compliance.user, {onDelete: "CASCADE"})
  compliance: Compliances;

  @OneToMany( () => Wallet, (wallet) => wallet.user)
  wallet: Wallet;

  @OneToMany( () => Transactions, (transaction) => transaction.user)
  transaction: Transactions;

}