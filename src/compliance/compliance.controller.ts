import { BadRequestException, Body, Controller, Get, Headers, InternalServerErrorException, Param, ParseIntPipe, Patch, Post, Query, UnauthorizedException, UploadedFile, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ComplianceService } from './compliance.service';
import {  CreateCompDto } from 'src/DTO/createComp';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequestWithUser } from 'src/auth/userRequest';
import { request } from 'express';
import * as cloudinary from 'cloudinary';
import { UpdateCompDto } from 'src/DTO/updateComp';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('compliance')
export class ComplianceController {
    constructor(private compService: ComplianceService, private jwtService: JwtService, private userService: UserService) {}    

    @Post("/new")
    @UseInterceptors(FileInterceptor('image'))
    async addCompliance(@Query("access_token") access_token: string, @UploadedFile() file: Express.Multer.File){
        const createCompDto: CreateCompDto = {
            ...JSON.parse(request.body.createCompDto),
            imageUrl: '',
            publicId: '',
          };
        console.log("what is it?")
        if (file) {
            const uploadedImage = await cloudinary.v2.uploader.upload(file.path);
            createCompDto.imageUrl = uploadedImage.secure_url;
            createCompDto.publicId = uploadedImage.public_id;
        }
        console.log(createCompDto.imageUrl)
        console.log(createCompDto.publicId)
        console.log("heyyyyoo please")

        const user = this.jwtService.decode(access_token);
        const id = user.sub;
        const getUser = await this.userService.findById(id);
        return await this.compService.createComp(createCompDto, getUser);
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
  