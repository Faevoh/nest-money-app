import { CreateCompDto } from 'src/DTO/createComp';
import { UpdateCompDto } from 'src/DTO/updateComp';
import { Compliances } from 'src/Entities/compEntity.entity';
import { User } from 'src/Entities/userEntity.entity';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
export declare class ComplianceService {
    private compRepo;
    private authService;
    private userService;
    constructor(compRepo: Repository<Compliances>, authService: AuthService, userService: UserService);
    createComp(createCompDto: CreateCompDto, user: User): Promise<{
        statusCode: number;
        message: string;
        data: Compliances;
    }>;
    updateComp(id: number, updateCompDto: UpdateCompDto): Promise<{
        accountName?: string;
        businessAddress?: string;
        businessName?: string;
        bankCode?: string;
        id: number;
        BVN: string;
        NIN?: string;
        state: string;
        country: string;
        address: string;
        LGA: string;
        city: string;
        imageUrl: string;
        certUrl: string;
        memoUrl: string;
        userId: number;
        user: User;
    } & Compliances>;
    findByUserId(userId: number): Promise<Compliances>;
}
