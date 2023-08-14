import { IsNotEmpty} from "class-validator";

export class CreateCompDto {
    @IsNotEmpty()
    BVN: string;

    NIN ?: string;

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

    certUrl ?: string;

    memoUrl ?: string;

    businessName ?: string;

    businessAddress ?: string;
}