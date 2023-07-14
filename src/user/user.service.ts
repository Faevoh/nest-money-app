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
// import { accountGenerator } from 'src/auth/generator.service';
import {accountGenerator} from "../auth/generator.service"
import { MailService } from 'src/mail/mail.service';
@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>, private walletService: WalletService, private jwtService: JwtService, private acctService: accountGenerator, private mailService: MailService){}

    async register(createUserDto: CreateUserDto) {
        // console.log("A")
        try{
            const {firstName, lastName, email, password} = createUserDto
            
            /* If user already exists*/
            const userExist = await this.userRepo.findOneBy({email});
            if(userExist) {
               throw new BadRequestException ({statusCode: 400, message: "User Exists Already"});
            }
            
            /* Creating New User*/
            const hashed = await bcrypt.hash(password, 10);
            const salt = bcrypt.getSalt(hashed)

            const data = new User();
            data.firstName = firstName;
            data.lastName = lastName;
            data.email = email;
            data.password = hashed;
            data.accountType = false;
            data.accountName = `${data.lastName} ${data.firstName}`
            data.accountNumber = this.acctService.accountnumberGenerator()
            data.createDate = new Date();
            data.updateDate = new Date();
            
            this.userRepo.create(data)
            // console.log("heyy" + data.accountNumber)
            await this.userRepo.save(data)
            await this.walletService.newWallet(data)
            // console.log(data)
            // const createdUser = await this.userRepo.save(user)
            // console.log("user" ,user)
            
            // const jwtPayload = {sub: createdUser.id, email: user.email};
            // const jwtToken = await this.jwtService.sign(jwtPayload)
            // console.log(jwtToken)

            delete data.phoneNumber
            delete data.resetToken 
            delete data.resetTokenExpiry


            const verify = `https://marco-lyart.vercel.app/#/verify`
            const text = `Dear ${createUserDto.firstName}, 
            Welcome to Money App. 
            Kindly click on the link to verify your email ${verify} `;

            await this.mailService.welcomeMail(text, data);
           
            return {statusCode: 201, message: "User successfully Created"}
        }catch(err){
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
        // return await this.userRepo.remove(deleteuser)

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
    
}
