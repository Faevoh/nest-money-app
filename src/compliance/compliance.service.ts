import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompDto } from 'src/DTO/createComp';
import { UpdateCompDto } from 'src/DTO/updateComp';
import { Compliances } from 'src/Entities/compEntity.entity';
import { User } from 'src/Entities/userEntity.entity';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class ComplianceService {
    constructor(@InjectRepository(Compliances) private compRepo: Repository<Compliances>, private authService: AuthService, private userService: UserService) {}

    async createComp (createCompDto: CreateCompDto, user: User) {
        try{
            const {BVN, NIN, businessDetails} =createCompDto

            const comp = new Compliances()
            comp.BVN = BVN
            comp.NIN = NIN
            
            // if(user.accountType === "business" && (!businessDetails || businessDetails.trim() === "")) {
            //     throw new BadRequestException("This is a Business Account. Business Details must be provided");
            // }   
            comp.businessDetails = businessDetails
           
            comp.userId = user.id,
            comp.completed = false

            console.log(user)
            const newComp = this.compRepo.create(comp)
            const result = await this.compRepo.save(newComp)
            console.log(result)
            return {statusCode: 201, message: "Compliance Added", data: result}
        }catch(err) {
            console.log(err)
            throw new InternalServerErrorException("Something occoured, Compliance not Added")
            
        }
    }

    async updateComp (id: number, updateCompDto: UpdateCompDto) {
        try{
            const userCompliance = await this.compRepo.findOneBy({id})

            if(!userCompliance){
                throw new Error ("Compliance not found")
            }
            const newUpdate = { ...userCompliance, ...updateCompDto}

            return this.compRepo.save(newUpdate)
        }catch(err){
            throw new NotFoundException("Update not processed ")
        }
    }

    async findByBankCode(bankCode: string) {
        return await this.compRepo.findOneBy({bankCode})
    }

    async findByUserId(userId: number) {
        return await this.compRepo.findOneBy({userId})
    }
}
