import { ComplianceService } from './compliance.service';
import { CreateCompDto } from 'src/DTO/createComp';
import { RequestWithUser } from 'src/auth/userRequest';
import { UpdateCompDto } from 'src/DTO/updateComp';
export declare class ComplianceController {
    private compService;
    constructor(compService: ComplianceService);
    addCompliance(createCompDto: CreateCompDto, request: RequestWithUser): Promise<{
        statusCode: number;
        message: string;
        data: import("../Entities/compEntity.entity").Compliances;
    }>;
    updateCompliance(updateCompDto: UpdateCompDto, id: number): Promise<{
        accountName?: string;
        businessDetails: string;
        bankCode: string;
        id: number;
        BVN: string;
        NIN: string;
        userId: number;
        user: import("../Entities/userEntity.entity").User;
    } & import("../Entities/compEntity.entity").Compliances>;
}
