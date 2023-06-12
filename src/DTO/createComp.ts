import { IsNotEmpty} from "class-validator";

export class CreateCompDto {
    @IsNotEmpty()
    BVN: string;

    @IsNotEmpty()
    NIN: string;

    @IsNotEmpty()
    accountType: string;
    
    @IsNotEmpty()
    accountName: string;

    @IsNotEmpty()
    accountNumber: string;

    @IsNotEmpty()
    businessDetails: string;

    @IsNotEmpty()
    bankCode: string;
}