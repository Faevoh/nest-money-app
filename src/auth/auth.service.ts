import { Injectable } from '@nestjs/common';
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
        const verifyToken = this.jwtService.verify(access_token,{secret: process.env.SECRET})
        const verifyId = verifyToken.id
        console.log(verifyToken)
        console.log(verifyId)
       }catch(err){
        throw new Error("Invalid token")
       }
    }
    
}


// async validateToken(token: string): Promise<any> {
//     try {
//       // Verify the token using the JWT secret key
//       const payload = verify(token, jwtSecretKey);

//       // Return the user data extracted from the token
//       return payload;
//     } catch (error) {
//       // Token is invalid or has expired
//       throw new Error('Invalid token');
//     }
//   }