import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./userEntity.entity";

@Entity()
export class Compliances {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    BVN: string;

    @Column({unique: true})
    NIN: string;

    @Column()
    accountName: string;

    @Column({unique: true})
    accountNumber: string;

    @Column()
    businessDetails: string;

    @Column({unique: true})
    bankCode: string

    @Column()
    userId: number

    @OneToOne( () => User, (user) => user.compliance)
    @JoinColumn()
    user: User;
} 