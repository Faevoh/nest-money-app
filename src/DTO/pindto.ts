import { IsNotEmpty } from "class-validator";

export class UserPinDto {
    @IsNotEmpty()
    bankPin: string;
}
