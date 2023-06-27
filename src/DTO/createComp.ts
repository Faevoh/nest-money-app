import { IsNotEmpty} from "class-validator";

export class CreateCompDto {
    @IsNotEmpty()
    BVN: string;

    @IsNotEmpty()
    NIN: string;

    businessDetails: string;

    bankCode: string;
}