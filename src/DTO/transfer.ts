import { IsNotEmpty, Length } from "class-validator";

export class TransferDto {
    @IsNotEmpty()
    accountNumber: string;

    @IsNotEmpty()
    amount: number;

    narration: string;
}