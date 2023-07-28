import { AccountType } from "src/Entities/userEntity.entity";
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    accountType: AccountType;
}
