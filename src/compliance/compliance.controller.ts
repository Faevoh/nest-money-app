import { BadRequestException, Body, Controller, Get, Headers, InternalServerErrorException, Param, ParseIntPipe, Patch, Post, Query, UnauthorizedException, UploadedFile, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ComplianceService } from './compliance.service';
import {  CreateCompDto } from 'src/DTO/createComp';
import * as cloudinary from 'cloudinary';
import { UpdateCompDto } from 'src/DTO/updateComp';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Compliances } from 'src/Entities/compEntity.entity';

@Controller('compliance')
export class ComplianceController {
    constructor(private compService: ComplianceService, private jwtService: JwtService, private userService: UserService, private cloudinaryService: CloudinaryService) {}    

    @Post("/new")
    @UseInterceptors(FileInterceptor('image'))
    async addCompliance(@Query("access_token") access_token: string,@Body(ValidationPipe) createCompDto: CreateCompDto, @UploadedFile() file: Express.Multer.File, ){
        console.log("what is it now?")
        console.log("2" + file)
        try{
        console.log("what is it?")
        console.log(file)
        if (file) {
            const uploadedImage = await this.cloudinaryService.uploadImage(file);
            createCompDto.imageUrl = uploadedImage.secure_url;
        }
        console.log(createCompDto.imageUrl)
        console.log("heyyyyoo please")

        const user = this.jwtService.decode(access_token);
        const id = user.sub;
        const getUser = await this.userService.findById(id);
        return await this.compService.createComp(createCompDto, getUser);
       }catch(err){
        console.log(err.message)
        throw new Error(err.message)
       }
    }

    @Patch("/:id/compliance-update")
    async updateCompliance(@Body() updateCompDto: UpdateCompDto, @Param("id", ParseIntPipe) id: number) {
        return await this.compService.updateComp(id, updateCompDto)
    }

    @Get()
    tokenCheck(@Headers("authorization") authorization: string) {
        const token = authorization.split(" ")[1];
        try{
            const verifyToken = this.jwtService.verifyAsync(token,{secret: process.env.SECRET});

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
  