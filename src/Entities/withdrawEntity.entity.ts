import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Withdrawal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Currency: string;

    @Column()
    amount: string;

    @Column()
    transactionRef: string;
}