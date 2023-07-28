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
import { AccountType } from 'src/Entities/accountEntity.entity';
@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>, private walletService: WalletService, private jwtService: JwtService, private acctService: accountGenerator, private mailService: MailService, @InjectRepository(AccountType)
    private accountTypeRepo: Repository<AccountType>) {}

    async register(createUserDto: CreateUserDto) {
        try{
            const {firstName, lastName, email, password, accountType} = createUserDto
            
            /* If user already exists*/
            const userExist = await this.userRepo.findOneBy({email});
            if(userExist) {
               throw new BadRequestException("User Exists Already");
            }

            /* Creating New User*/
            const hashed = await bcrypt.hash(password, 10);
            const salt = bcrypt.getSalt(hashed)

            const data = new User();
            data.firstName = firstName;
            data.lastName = lastName;
            data.email = email;
            data.password = hashed;
            data.accountType =  accountType as "business" | "personal";
            data.accountName = `${data.lastName} ${data.firstName}`;
            data.verified = false;
            data.verifyToken = uuidv4();
            data.token = uuidv4()
            data.createDate = new Date();
            data.updateDate = new Date();

            if(data.accountType === 'business'){
                data.status = true;
            } 

            await this.userRepo.save(data)
            await this.walletService.newWallet(data)
            // console.log(data.accountType.status)
            // console.log(data)
            // const createdUser = await this.userRepo.save(user)
            // console.log("user" ,user)
            
            // const jwtPayload = {sub: createdUser.id, email: user.email};
            // const jwtToken = await this.jwtService.sign(jwtPayload)
            // console.log(jwtToken)
            delete data.token
            delete data.phoneNumber
            delete data.sex
            delete data.imageurl
            delete data.resetToken 
            delete data.resetTokenExpiry

            const verifyLink = `https://moneyapp-oj7v.onrender.com/api/user/verify/${data.verifyToken}`;
            // console.log(data.verifyToken)
            const verify = `https://marco-lyart.vercel.app/#/verify/${data.verifyToken}`;
            const text = ` Welcome to Money App,
            Thank you for signing up.
            Kindly click on the link to verify your email`;
            const link = `${verify}`

            await this.mailService.VerifyMail(text,link,data);
           
            return {statusCode: 201, message: "User successfully Created"}
        }catch(err){
            console.log(err.message)
            if(err instanceof BadRequestException){ throw new BadRequestException(err.message)}
            throw new InternalServerErrorException("Something went wrong, User not Created")
        }
    }

    async login(email: string) {
        return await this.userRepo.findOneBy({email})
    }

    async findById(id: number) {
        return await this.userRepo.findOneBy({id})
    }

    async findIdWithRelations(id: number) {
        return await this.userRepo.find({
            where:{id},
            relations: ["compliance", "wallet", "transaction"]
        })
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

    async update(id: number, dataToUpdate: Partial<User>) {
        const getid = await this.userRepo.findOneBy({id});

        if(!getid) { throw new NotFoundException("user not found")}

        Object.assign(getid, dataToUpdate);

        return await this.userRepo.save(getid)
    }

    async findByToken(resetToken: string) {
        return await this.userRepo.findOneBy({resetToken})
    }

    async findByChangePasswordToken(token: string) {
        return await this.userRepo.findOneBy({token})
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

    async findByVerifyToken(verifyToken: string) {
        return await this.userRepo.findOneBy({verifyToken});
    }
    
    async updateStatus(id: number, verified:  boolean) {
        return this.userRepo.update(id, {verified});
    }
}
