import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompDto } from 'src/DTO/createComp';
import { UpdateCompDto } from 'src/DTO/updateComp';
import { Compliances } from 'src/Entities/compEntity.entity';
import { User } from 'src/Entities/userEntity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComplianceService {
    constructor(@InjectRepository(Compliances) private compRepo: Repository<Compliances>) {}

    async createComp (createCompDto: CreateCompDto, user: User) {
        try{
            const {BVN, NIN, accountName, accountNumber, accountType ,businessDetails, bankCode} =createCompDto

            const compExists = await this.compRepo.findOneBy({accountNumber})
            if(compExists) {
                return {statuscode: 400, message: "User with Compliance Exists already", data: null}
            }

            const comp = new Compliances()
            comp.BVN = BVN
            comp.NIN = NIN
            comp.accountName = accountName
            comp.accountNumber = accountNumber
            comp.businessDetails = businessDetails
            comp.bankCode = bankCode
            comp.accountType = accountType
            comp.userId = user.id

            const newComp = this.compRepo.create(comp)
            const result = await this.compRepo.save(newComp)
            console.log(result)
            return {statusCode: 201, message: "Compliance Added", data: result}
        }catch(err) {
            throw new InternalServerErrorException("Something occoured, Compliance not Added")
            // console.log(err)
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
