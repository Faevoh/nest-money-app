import { CreateCompDto } from 'src/DTO/createComp';
import { UpdateCompDto } from 'src/DTO/updateComp';
import { Compliances } from 'src/Entities/compEntity.entity';
import { User } from 'src/Entities/userEntity.entity';
import { Repository } from 'typeorm';
export declare class ComplianceService {
    private compRepo;
    constructor(compRepo: Repository<Compliances>);
    createComp(createCompDto: CreateCompDto, user: User): Promise<{
        statusCode: number;
        message: string;
        data: Compliances;
    }>;
    updateComp(id: number, updateCompDto: UpdateCompDto): Promise<{
        accountName?: string;
        businessDetails: string;
        bankCode: string;
        id: number;
        BVN: string;
        NIN: string;
        userId: number;
        user: User;
    } & Compliances>;
    findByBankCode(bankCode: string): Promise<Compliances>;
    findByUserId(userId: number): Promise<Compliances>;
}
