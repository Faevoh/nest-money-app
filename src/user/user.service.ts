import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/DTO/createUser';
import { User } from 'src/Entities/userEntity.entity';
import { UpdateUserDto } from 'src/DTO/updateUser';
import { Wallet } from 'src/Entities/walletEntity.entity';
import { WalletService } from 'src/wallet/wallet.service';
import { accountGenerator } from 'src/auth/generator.service';
import { MailService } from 'src/mail/mail.service';
@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>, private walletService: WalletService, private jwtService: JwtService, private acctService: accountGenerator, private mailService: MailService){}

    async register(createUserDto: CreateUserDto) {
        try{
            const {FirstName, LastName, email, password, accountType} = createUserDto
            
            /* If user already exists*/
            const userExist = await this.userRepo.findOneBy({email});
            if(userExist) {
                return {statusCode: 400, message: "User Exists Already", data: null};
            }
            
            /* Creating New User*/
            const hashed = await bcrypt.hash(password, 10);
            const salt = bcrypt.getSalt(hashed)

            const data = new User();
            data.FirstName = FirstName;
            data.LastName = LastName;
            data.email = email;
            data.password = hashed;
            data.accountType = accountType;
            data.accountNumber = this.acctService.accountnumberGenerator();
            data.accountName = `${data.LastName} ${data.FirstName}`
            data.createDate = new Date();
            data.updateDate = new Date();
            
            this.userRepo.create(data)
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


            const verify = `http://localhost:3000/api`
            const text = `Dear ${createUserDto.FirstName}, 
            Welcome to Money App. 
            Kindly click on the link to verify your email ${verify} `;

            await this.mailService.welcomeMail(text, data);
           
            return {statusCode: 201, message: "User successfully Created", data: data}
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

    async findByEmail(email: string) {
        return await this.userRepo.findOneBy({email})
    }

    async saveUser(user: User): Promise<User> {
        return this.userRepo.save(user);
    }

    async update(id: number, data: any) {
        return await this.userRepo.update(id, data)
    }

    async findByToken(token: string) {
        return await this.userRepo.findOneBy({resetToken: token})
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
