import { Optional } from "@nestjs/common";
import { IsEmail, IsNotEmpty, IsNumberString, Matches, MaxLength, MinLength } from "class-validator";
import { AccountType } from "src/Entities/accountEntity.entity";

export class CreateUserDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6) @MaxLength(20)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/ ,{
         message: "Password should contain atleast capital letter,small letter,number and special character, And must be at least 6 to 12 characters long"})
    password: string;

    @IsNotEmpty()
    accountType: AccountType;
}