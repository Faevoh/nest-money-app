import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("accountType")
export class AccountType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['business', 'personal'],
    default: 'personal',
  })
  type: 'business' | 'personal';

  @Column({ default: false })
  status: boolean;

  setStatusFromType() {
  this.status = this.type === this.type;
  }
}