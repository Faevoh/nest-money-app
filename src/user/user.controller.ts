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

@Controller('user')
export class UserController {
    constructor(private userService: UserService, private mailService: MailService, private authService: AuthService, private acctService: accountGenerator, private jwtService: JwtService){}

    @Post("/register")
    async registerUser(@Body(ValidationPipe) createUserDto: CreateUserDto){ 
       return this.userService.register(createUserDto);
    }

    @Patch("/verify/:verifyToken")
    async emailVerification(@Param("verifyToken") verifyToken: string) {
        const check = await this.userService.findByVerifyToken(verifyToken);
        // console.log(email , verifyToken)
        if(!check){
            return "Invalid verification link"
        }
        await this.userService.updateStatus(check.id, true);
        return{statuscode: 200, message: "You have been verified"};
    }

    @UseGuards(LocalAuthGuard)
    @Post("login")
    login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Delete("delete/:id")
    removeUser(@Param("id" ,ParseIntPipe) id: number ) {
        return this.userService.deleteUser(id)
    }

    @Get()
    getAll() {
        return this.userService.allUser()
    }

    // @UseGuards(JwtAuthGuard)
    // @Get("/:id")
    // async getOne(@Param("id", ParseIntPipe) id: number ) {
    //     const result = await this.userService.findById(id)
    //     const{resetToken,resetTokenExpiry, verifyToken, ...others} = result
    //     return {statusCode: 200, message: `success, data of ${id}`, data: others}
    // }

    // @UseGuards(JwtAuthGuard)
    // @Get("/profile/:access_token")
    // async getUserProfile(@Param("access_token") token: string, @Request() req) {
    //     if(!req.user){
    //         throw new UnauthorizedException("Invalid token")
    //     }
    //     const id = req.user.id
    //     const result = await this.userService.findById(id)
    //     const{resetToken,resetTokenExpiry, verifyToken, ...others} = result
    //     return {statusCode: 200, message: `success, data of user ${result.firstName}, id ${id}`, data: others}

    // }

    @UseGuards(JwtAuthGuard)
    @Get("/profile")
    async getUser(@Query("access_token") access_token: string) {
        const tokenDecode = this.jwtService.decode(access_token)
        console.log(tokenDecode);
        const id = tokenDecode.sub;
        console.log(id);
        const result = await this.userService.findById(id);
        const{resetToken,resetTokenExpiry, verifyToken, ...others} = result
        return {statusCode: 200, message: `success, data of user ${result.firstName}, id ${id}`, data: others}

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
       if(!checkUser) { throw new NotFoundException ("User token is invalid or has expired")}

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

    @UseGuards(JwtAuthGuard)
    @Post("/logout")
    async logOut(@Headers("authorization") access_token: string) {
        const user_token = access_token.split(" ")[1];
        await this.authService.revokeToken(user_token);
        return {statusCode: 201, message: "Logged Out Successfully"};
    }
}