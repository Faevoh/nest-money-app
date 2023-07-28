export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    accountType: AccountTypeDto;
}
export declare class AccountTypeDto {
    type: 'business' | 'personal';
    status: boolean;
}
