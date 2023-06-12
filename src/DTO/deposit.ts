import { IsNotEmpty } from "class-validator";

export class DepositDto {
    @IsNotEmpty()
    currency: string;

    @IsNotEmpty()
    amount: string;
    
    @IsNotEmpty()
    type: string;
}