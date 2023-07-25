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
            const {BVN, NIN, state, LGA, city} =createCompDto;

            const checkBVN = await this.compRepo.findOneBy({BVN})
            if(checkBVN){
                throw new BadRequestException("BVN already exists")
            }

            const checkNIN = await this.compRepo.findOneBy({NIN})
            if(checkNIN){ 
                throw new BadRequestException("NIN already exists")
            }

            const comp = new Compliances()
            comp.BVN = BVN;
            comp.NIN = NIN;
            comp.state = state;
            comp.LGA = LGA;
            comp.city = city;
            comp.userId = user.id;
            comp.completed = false;
            const userData = await this.userService.findById(user.id)
            console.log(userData)
            //if(user.accountType === "business" && (!businessDetails || businessDetails.trim() === "")) {
                //     throw new BadRequestException("This is a Business Account. Business Details must be provided");
                // }   
                // comp.businessDetails = businessDetails
               

            // console.log(user)
            const newComp = this.compRepo.create(comp)
            console.log(newComp.businessAddress)
            console.log(newComp.businessName)
            if(userData.accountType === true && (newComp.businessAddress && newComp.businessName === null)) {
                throw new BadRequestException("businessAddress and businessName cannot be empty")
            }
            const result = await this.compRepo.save(newComp)
            // console.log(result)
            return {statusCode: 201, message: "Compliance Added", data: result}
        }catch(err) {
            // console.log(err)
            if(err instanceof BadRequestException){
                throw new BadRequestException(err.message)
            }
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

    // async findByBVN(BVN: string) {
    //     return await this.compRepo.findOneBy({BVN})
    // }

    async findByBankCode(bankCode: string) {
        return await this.compRepo.findOneBy({bankCode})
    }

    async findByUserId(userId: number) {
        return await this.compRepo.findOneBy({userId})
    }
}
