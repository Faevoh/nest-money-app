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

    @Column({nullable: true})
    businessName ?: string;

    @Column({nullable: true})
    businessAddress ?: string;

    @Column()
    state: string;

    @Column()
    country: string;

    @Column()
    address: string;

    @Column()
    LGA: string;

    @Column()
    city: string;

    @Column({nullable: true})
    imageUrl: string;

    @Column({nullable: true})
    publicId: string;

    @Column({unique: true, nullable:true})
    bankCode ?: string;

    @Column({default: false})
    completed: boolean;

    @Column()
    userId: number;

    @OneToOne( () => User, (user) => user.compliance)
    @JoinColumn()
    user: User;
} 