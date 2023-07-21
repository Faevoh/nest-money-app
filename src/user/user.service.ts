import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/DTO/createUser';
import { User } from 'src/Entities/userEntity.entity';
import { UpdateUserDto } from 'src/DTO/updateUser';
import { Wallet } from 'src/Entities/walletEntity.entity';
import { WalletService } from 'src/wallet/wallet.service';
import {v4 as uuidv4} from "uuid"
import {accountGenerator} from "../auth/generator.service"
import { MailService } from 'src/mail/mail.service';
@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>, private walletService: WalletService, private jwtService: JwtService, private acctService: accountGenerator, private mailService: MailService){}

    async register(createUserDto: CreateUserDto) {
        console.log("A")
        try{
            
            return {statusCode: 201, message: "User successfully Created"}
        }catch(err){
            console.log(err.message)
            throw new InternalServerErrorException("Something went wrong, User not Created")
        }
    }

    async login(email: string) {
        return await this.userRepo.findOneBy({email})
    }

    async findById(id: number) {
        return await this.userRepo.findOneBy({id})
    }

    async findByAccountType(accountType) {
        return await this.userRepo.findOneBy({accountType})
    }

    async findByEmail(email: string) {
        return await this.userRepo.findOneBy({email})
    }

    async saveUser(user: User): Promise<User> {
        return this.userRepo.save(user);
    }

    async update(id: number, data: any) {
        return await this.userRepo.update(id, data)
    }

    async findByToken(resetToken: string) {
        return await this.userRepo.findOneBy({resetToken})
    }

    async deleteUser(id: number) {
        const deleteuser = await this.findById(id)

        const result = await this.userRepo.delete(deleteuser)

        if(result.affected === 0) {
            throw new NotFoundException("User was not Deleted");
        }else{
            return {success: true, message: "Sucessfully deleted"};
        } 
    }

    async allUser():Promise<User[]> {
        return await this.userRepo.find({
            relations: ["compliance", "wallet", "transaction"]
        })
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto) {
        try{
            const userUpdate = await this.userRepo.findOneBy({id})

            if(!userUpdate){
                throw new Error ("User not Found")
            }
            Object.assign( userUpdate, updateUserDto)

            delete userUpdate.password

            return this.userRepo.save(userUpdate)
        }catch(err){
            throw new NotFoundException("User not found, update not processed")
        }
    }

    async findByEmailAndVerifyToken(email: string, verifyToken: string) {
        return await this.userRepo.findOneBy({email, verifyToken});
    }
    
    async updateStatus(id: number, verified:  boolean) {
        return this.userRepo.update(id, {verified});
    }
}
