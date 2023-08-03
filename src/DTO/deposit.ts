import { IsNotEmpty, Length } from "class-validator";

export class DepositDto {
    @IsNotEmpty()
    @Length(16, 16)
    cardNumber: string;

    @IsNotEmpty()
    amount: number;
    
    @IsNotEmpty()
    expiryDate: string;

    @IsNotEmpty()
    @Length(3,3)
    CVV: string;
}