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

    @IsNotEmpty()
    country: string;

    @IsNotEmpty()
    address: string;

    imageUrl ?: string;

    businessName ?: string;

    businessAddress ?: string;

    bankCode ?: string;
}