import { User } from "./userEntity.entity";
export declare class Compliances {
    id: number;
    BVN: string;
    NIN: string;
    businessDetails?: string;
    bankCode?: string;
    completed: boolean;
    userId: number;
    user: User;
}
