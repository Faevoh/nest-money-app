import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';

config();

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.login(email);
        if(!email){
         return new NotFoundException("Invalid User")
        }
        if(!await bcrypt.compare(password, user.password)){
            return new NotFoundException("Email or Password are Invalid")
        }

        if(user && await bcrypt.compare(password, user.password) ) {
            return user;
        }
        return null
    }

    async login(user) {
        const payload = {email: user.email, sub: user.id}
        const users = await this.userService.findById(payload.sub)
        const {password, email, ...data} = users
        return{
            statusCode: 201,
            message: "Successfully logged in",
            access_token: this.jwtService.sign(payload)
        }
    }

    async validateToken(access_token: string){
       try{
        const verifyToken = this.jwtService.verifyAsync(access_token,{secret: process.env.SECRET})
        if(verifyToken){
            const getUserId = verifyToken["sub"];
            const user = this.userService.findById(getUserId)
            return user;
        }
       }catch(err){
        throw new UnauthorizedException("Invalid token")
       }
    }
    
}
