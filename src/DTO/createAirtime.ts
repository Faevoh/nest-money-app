import { IsNotEmpty} from "class-validator";

export class CreateAirtimeDto {
    @IsNotEmpty()
    amount: number;

    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
    serviceNetwork: string;
}