/// <reference types="multer" />
import { ComplianceService } from './compliance.service';
import { CreateCompDto } from 'src/DTO/createComp';
import { UpdateCompDto } from 'src/DTO/updateComp';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Compliances } from 'src/Entities/compEntity.entity';
export declare class ComplianceController {
    private compService;
    private jwtService;
    private userService;
    private cloudinaryService;
    constructor(compService: ComplianceService, jwtService: JwtService, userService: UserService, cloudinaryService: CloudinaryService);
    addCompliance(access_token: string, createCompDto: CreateCompDto, file: Express.Multer.File, payload: any): Promise<{
        statusCode: number;
        message: string;
        data: Compliances;
    }>;
    updateCompliance(updateCompDto: UpdateCompDto, id: number): Promise<{
        accountName?: string;
        businessAddress?: string;
        businessName?: string;
        bankCode?: string;
        id: number;
        BVN: string;
        NIN: string;
        state: string;
        country: string;
        address: string;
        LGA: string;
        city: string;
        imageUrl: string;
        userId: number;
        user: import("../Entities/userEntity.entity").User;
    } & Compliances>;
    tokenCheck(authorization: string): Promise<import("../Entities/userEntity.entity").User>;
}
