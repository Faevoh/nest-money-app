import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, Request, UseGuards, ValidationPipe } from '@nestjs/common';
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

@Controller('user')
export class UserController {
    constructor(private userService: UserService, private mailService: MailService, private authService: AuthService, private acctService: accountGenerator){}

    @Post("/register")
    async registerUser(@Body(ValidationPipe) createUserDto: CreateUserDto){ 
        return this.userService.register(createUserDto)
    }

    @Get("/verify")
    async emailVerification(@Query("email") email: string, @Query("verifyToken") verifyToken: string) {
        const check = await this.userService.findByEmailAndVerifyToken(email, verifyToken);
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

    @Get("/:id")
    async getOne(@Param("id", ParseIntPipe) id: number ) {
        const result = await this.userService.findById(id)
        const{resetToken,resetTokenExpiry, ...others} = result
        return {statusCode: 200, message: `success, data of ${id}`, data: others}
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
                throw new BadRequestException("Email does not exist")
            }

            const resetToken = uuidv4();

            checkUser.resetToken = resetToken;
            checkUser.resetTokenExpiry = new Date(Date.now() + 3600000)

            // console.log(checkUser)
            // console.log(resetToken)
            // console.log(checkUser.resetTokenExpiry)

            await this.userService.saveUser(checkUser)

            const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
            const subject = "Password Reset";
            const text = `${resetToken}`

            await this.mailService.sendMail(text, checkUser);

            return {statusCode: 201, message: "An Email with your token has been sent to you"}
        }catch(err){
            throw new BadRequestException("Failed to Send Email")
        }
    }

    @Post("/reset-password")
    async resetPassword(@Body(ValidationPipe) resetPasswordDto: ResetPasswordDto, users: User) {
        const {password} = resetPasswordDto;
        const {resetToken} = users
        const checkUser = await this.userService.findByToken(resetToken);
        if(!checkUser) { throw new NotFoundException ("User token is invalid or has expired")}

        checkUser.password = password;
        checkUser.resetToken = null;
        checkUser.resetTokenExpiry = null;

        const hashed = await bcrypt.hash(password, 10);

        await this.userService.update(checkUser.id, {password: hashed})

        // const data = await this.userService.saveUser(checkUser);

        // console.log(checkUser)
        // console.log(data)
        return {statusCode: 200, message: "New Password saved"}
    }
}
