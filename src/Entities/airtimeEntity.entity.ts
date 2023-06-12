import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Airtime {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column()
    phoneNumber: string;

    @Column()
    serviceNetwork: string;
}