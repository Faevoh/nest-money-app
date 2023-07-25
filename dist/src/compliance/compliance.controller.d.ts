import { ComplianceService } from './compliance.service';
import { CreateCompDto } from 'src/DTO/createComp';
import { UpdateCompDto } from 'src/DTO/updateComp';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
export declare class ComplianceController {
    private compService;
    private jwtService;
    private userService;
    constructor(compService: ComplianceService, jwtService: JwtService, userService: UserService);
    addCompliance(access_token: string, createCompDto: CreateCompDto): Promise<{
        statusCode: number;
        message: string;
        data: import("../Entities/compEntity.entity").Compliances;
    }>;
    updateCompliance(updateCompDto: UpdateCompDto, id: number): Promise<{
        accountName?: string;
        businessDetails?: string;
        bankCode?: string;
        id: number;
        BVN: string;
        NIN: string;
        businessName?: string;
        businessAddress?: string;
        state: string;
        LGA: string;
        city: string;
        completed: boolean;
        userId: number;
        user: import("../Entities/userEntity.entity").User;
    } & import("../Entities/compEntity.entity").Compliances>;
    tokenCheck(authorization: string): Promise<import("../Entities/userEntity.entity").User>;
}
