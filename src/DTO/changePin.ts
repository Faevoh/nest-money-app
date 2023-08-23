import { IsNotEmpty } from "class-validator";

export class ChangePinDto{
    @IsNotEmpty()
    oldPin: string;

    @IsNotEmpty()
    newPin: string;
}