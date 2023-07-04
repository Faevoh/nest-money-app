import { IsNotEmpty} from "class-validator";

export class CreateCompDto {
    @IsNotEmpty()
    BVN: string;

    @IsNotEmpty()
    NIN: string;

    // @IsNotEmpty({ groups: ["business"] })
    businessDetails ?: string;

    bankCode ?: string;
}