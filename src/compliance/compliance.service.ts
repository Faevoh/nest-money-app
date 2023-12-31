import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompDto } from 'src/DTO/createComp';
import { UpdateCompDto } from 'src/DTO/updateComp';
import { Compliances } from 'src/Entities/compEntity.entity';
import * as cloudinary from 'cloudinary';
import { User } from 'src/Entities/userEntity.entity';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class ComplianceService {
    constructor(@InjectRepository(Compliances) private compRepo: Repository<Compliances>, private authService: AuthService, private userService: UserService) {}
       
    async createComp (createCompDto: CreateCompDto, user: User) {
        // console.log('whats going on no!!')
        try{ 
            const {BVN, NIN, state, LGA, city, businessAddress, businessName, country, address} =createCompDto;

            const checkBVN = await this.compRepo.findOneBy({BVN})
            if(checkBVN){
                throw new BadRequestException({message: "BVN already exists", error: 'Bad Request' })
            }

            const comp = new Compliances()
            comp.BVN = BVN;
            comp.NIN = NIN;
            comp.state = state;
            comp.LGA = LGA;
            comp.city = city;
            comp.country = country;
            comp.address = address
            comp.businessAddress = businessAddress;
            comp.businessName = businessName;
            comp.userId = user.id;

            const userData = await this.userService.findById(user.id);
            if(userData.status === true && (comp.businessAddress ===undefined||comp.businessAddress === null || comp.businessName === null || comp.businessName === undefined)) {
                throw new UnauthorizedException("businessAddress and businessName cannot be empty")
            }
            const newComp = this.compRepo.create(comp)
            newComp.imageUrl = createCompDto.imageUrl;
            newComp.certUrl = createCompDto.certUrl;
            newComp.docUrl = createCompDto.docUrl;
            // console.log("nin",newComp.imageUrl)
            // console.log("cert",newComp.certUrl)
            // console.log("memo",newComp.memoUrl)
            const result = await this.compRepo.save(newComp)
            return {statusCode: 201, message: "Compliance Added", data: result}
        }catch(err) {
            if(err instanceof BadRequestException){
                throw new BadRequestException(err.message)
                // console.log("1",err.message)
            }
            if(err instanceof UnauthorizedException){
                throw new BadRequestException(err.message)
                // console.log("2", err.message)
            }
            throw new BadRequestException(err.message)
            // console.log("3", err.message)
            
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

    async findByUserId(userId: number) {
        return await this.compRepo.findOneBy({userId})
    }
}
