import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./userEntity.entity";

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

    @Column()
    userId: number;

    @OneToOne( () => User, (user) => user.airtime)
    @JoinColumn()
    user: User;
}