import { User } from "./userEntity.entity";
export declare class Compliances {
    id: number;
    BVN: string;
    NIN: string;
    businessName?: string;
    businessAddress?: string;
    state: string;
    country: string;
    address: string;
    LGA: string;
    city: string;
    imageUrl: string;
    userId: number;
    user: User;
}
