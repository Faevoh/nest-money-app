import { IsEmail, IsNotEmpty, IsNumberString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    FirstName: string;

    @IsNotEmpty()
    LastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6) @MaxLength(12)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/ ,{
         message: "Password should contain atleast capital letter,small letter,number and special character, And must be at least 6 to 12 characters long"})
    password: string;

    accountType: "business || personal";

    @IsNumberString()
    accountNumber: string;

    accountName: string;

}