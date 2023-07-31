import { Length } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm";
import { User } from "./userEntity.entity";

@Entity("bankpin")
export class BankPin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4,4,{ message: 'Input 4 numbers' })
  bankPin: string;

  @Column()
  userId: number;

  @OneToOne( () => User, (user) => user.bankPin)
  @JoinColumn()
  user: User;
}