import { IsNotEmpty } from "class-validator";

export class ResetPasswordDto {
    @IsNotEmpty()
    oldPassword: string;

    @IsNotEmpty()
    newPassword: string;
}