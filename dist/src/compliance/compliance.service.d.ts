import { CreateCompDto } from 'src/DTO/createComp';
import { UpdateCompDto } from 'src/DTO/updateComp';
import { Compliances } from 'src/Entities/compEntity.entity';
import { User } from 'src/Entities/userEntity.entity';
import { Repository } from 'typeorm';
export declare class ComplianceService {
    private compRepo;
    constructor(compRepo: Repository<Compliances>);
    createComp(createCompDto: CreateCompDto, user: User): Promise<{
        statuscode: number;
        message: string;
        data: any;
        statusCode?: undefined;
    } | {
        statusCode: number;
        message: string;
        data: Compliances;
        statuscode?: undefined;
    }>;
    updateComp(id: number, updateCompDto: UpdateCompDto): Promise<{
        accountName: string;
        businessDetails: string;
        bankCode: string;
        id: number;
        BVN: string;
        NIN: string;
        accountNumber: string;
        accountType: string;
        userId: number;
        user: User;
    } & Compliances>;
    findByBankCode(bankCode: string): Promise<Compliances>;
    findByUserId(userId: number): Promise<Compliances>;
}
