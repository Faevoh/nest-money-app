import { IsNotEmpty} from "class-validator";

export class CreateCompDto {
    @IsNotEmpty()
    BVN: string;

    @IsNotEmpty()
    NIN: string;

    @IsNotEmpty()
    state: string;

    @IsNotEmpty()
    LGA: string;

    @IsNotEmpty()
    city: string;

    businessName ?: string;

    businessAddress ?: string;

    bankCode ?: string;
}