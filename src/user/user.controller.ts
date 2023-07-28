import { BadRequestException, Body, Controller, Delete, Get, Headers, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, Request, UnauthorizedException, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/DTO/createUser';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from 'src/DTO/updateUser';
import { ForgotPasswordDto } from 'src/DTO/forgotPassword';
import {v4 as uuidv4} from "uuid"
import { MailService } from 'src/mail/mail.service';
import { ResetPasswordDto } from 'src/DTO/resetPassword';
import * as bcrypt from 'bcryptjs'
import { accountGenerator } from 'src/auth/generator.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/Entities/userEntity.entity';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from 'src/DTO/changePassword';

@Controller('user')
export class UserController {
    constructor(private userService: UserService, private mailService: MailService, private authService: AuthService, private acctService: accountGenerator, private jwtService: JwtService){}

    @Post("/register")
    async registerUser(@Body(ValidationPipe) createUserDto: CreateUserDto){ 
       return this.userService.register(createUserDto);
    }

    @Patch("/verify/:verifyToken")
    async emailVerification(@Param("verifyToken") verifyToken: string) {
        try{
            const check = await this.userService.findByVerifyToken(verifyToken);
            // console.log(email , verifyToken)
            if(!check){
                throw new UnauthorizedException ("Invalid verification link")
            }
            await this.userService.updateStatus(check.id, true);
            return{statuscode: 200, message: "You have been verified"};
        }catch(err){
            if(err instanceof UnauthorizedException) {
                throw new UnauthorizedException(err.message)
            }
        }
    }

    @UseGuards(LocalAuthGuard)
    @Post("login")
    login(@Request() req) {
        return this.authService.login(req.user);
    }
    
    @Get()
    getAll() {
        return this.userService.allUser()
    }

    @Get("/profile")
    async getUser(@Query("access_token") access_token: string, payload) {
       try{
            const tokenDecode = this.jwtService.decode(access_token);
            if(!tokenDecode) {throw new NotFoundException("Invalid Token")};
            payload = tokenDecode
            // console.log(payload)
            const timeInSeconds = Math.floor(Date.now() / 1000); 
            if (payload.exp && payload.exp < timeInSeconds) {
            throw new UnauthorizedException("Token has expired");
            }
            // console.log(tokenDecode);
            const id = tokenDecode.sub;
            // console.log(id);
            const [userObject] = await this.userService.findIdWithRelations(id);
            const{resetToken,resetTokenExpiry, verifyToken,password, ...others} = userObject
            return {statusCode: 200, message: `success, id ${id}`, data: others}
       }catch(err){
        if(err instanceof NotFoundException){
            throw new NotFoundException(err.message)
        }
        if(err instanceof UnauthorizedException){
            throw new UnauthorizedException(err.message)
        }
       }
    }

    @Patch("/:id/profile-update")
    @UseGuards(JwtAuthGuard)
    async updateUser(@Param("id", ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        const updatedUser = await this.userService.updateUser(id, updateUserDto);
        return { statusCode: 200, message: "success", user: updatedUser };
    }

    @Post("/recover-password")
    async recoverPassword(@Body(ValidationPipe) forgotPasswordDto: ForgotPasswordDto){
        try{
            const {email} = forgotPasswordDto;
            // console.log(email)

            const checkUser = await this.userService.findByEmail(email)
            if(!checkUser) {
                throw new NotFoundException("Email does not exist")
            }
            const resetToken = uuidv4();

            checkUser.resetToken = resetToken;
            checkUser.resetTokenExpiry = new Date(Date.now() + 3600000)

            await this.userService.saveUser(checkUser)

            const text = `${resetToken}`

            await this.mailService.sendMail(text, checkUser);

            return {statusCode: 201, message: "An Email has been sent to you"}
        }catch(err){
            if(err instanceof NotFoundException){
                throw new BadRequestException(err.message)
            }
            throw new BadRequestException("Failed to Send Email")
        }
    }

    @Post("/reset-password/:resetToken")
    async resetPassword(@Param("resetToken") resetToken: string, @Body(ValidationPipe) resetPasswordDto: ResetPasswordDto) {
       try{
       const {password} = resetPasswordDto;

       const checkUser = await this.userService.findByToken(resetToken);
       if(!checkUser) { throw new NotFoundException ("User token is invalid")}

       const hashed = await bcrypt.hash(password, 10);

       checkUser.password = hashed;
       checkUser.resetToken = null;
       checkUser.resetTokenExpiry = null;


       await this.userService.update(checkUser.id, {password: checkUser.password, resetToken: null, resetTokenExpiry: null})

       return {statusCode: 201, message: "New Password saved"}
    }catch(err){
        if(err instanceof NotFoundException){
            throw new BadRequestException(err.message)
        }
        throw new BadRequestException("Failed to reset Password")
       }
    }

    @Patch("/change-password/:token")
    async changePassword(@Query("access_token") access_token: string, payload, @Body(ValidationPipe) changePasswordDto: ChangePasswordDto) {
        try{
            const tokenDecode = this.jwtService.decode(access_token);
            if(!tokenDecode) {throw new NotFoundException("Invalid Token")};
            payload = tokenDecode
            const timeInSeconds = Math.floor(Date.now() / 1000); 
            if (payload.exp && payload.exp < timeInSeconds) {
            throw new UnauthorizedException("Token has expired");
            }
            const id = tokenDecode.sub;
            const user = await this.userService.findById(id) 

            const {oldPassword, newPassword} = changePasswordDto;
            const checkOldPassword = await bcrypt.compare(oldPassword, user.password);
            if(!checkOldPassword) {
                throw new UnauthorizedException("password doesn't match. Please check properly")
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10)
            user.password = hashedPassword;

            await this.userService.update(user.id, {password: user.password});

            return {statusCode: 200, message: "Password has been changed"}

        }catch(err){
            if(err instanceof NotFoundException){
                throw new NotFoundException(err.message)
            }
            if(err instanceof UnauthorizedException){
                throw new UnauthorizedException(err.message)
            }
            throw new BadRequestException("Failed to change Password")
        }
    }

    @Post("/confirm-password")
    async confirmPassword(@Query("access_token") access_token: string, @Body() body: {password: string},payload ) {
        try{
            const userToken = this.jwtService.decode(access_token)

            if(!userToken) {throw new NotFoundException("Invalid Token")};
            payload = userToken
            const timeInSeconds = Math.floor(Date.now() / 1000); 
            if (payload.exp && payload.exp < timeInSeconds) {
            throw new UnauthorizedException("Token has expired")}

            const userid = userToken.sub
            const user = await this.userService.findById(userid) 

            const { password } = body;
            const checkPassword = await bcrypt.compare(password, user.password)

            if(!checkPassword){
                throw new UnauthorizedException("Password is Incorrect")
            }else{
                return {statusCode: 201, message: "Password is correct"}
            }
        }catch(err){
            if(err instanceof NotFoundException){
                throw new NotFoundException(err.message)
            }
            if(err instanceof UnauthorizedException){
                throw new UnauthorizedException(err.message)
            }
        }
    }

    @Post("/logout")
    async logOut(@Query("access_token") access_token: string) {
        const user_token = access_token.split(" ")[1];
        await this.authService.revokeToken(user_token);
        return {statusCode: 201, message: "Logged Out Successfully"};
    }

}