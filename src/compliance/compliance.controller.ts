import { BadRequestException, Body, Controller, Get, Headers, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, UnauthorizedException, UploadedFile, UploadedFiles, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ComplianceService } from './compliance.service';
import {  CreateCompDto } from 'src/DTO/createComp';
import * as cloudinary from 'cloudinary';
import { UpdateCompDto } from 'src/DTO/updateComp';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Compliances } from 'src/Entities/compEntity.entity';

@Controller('compliance')
export class ComplianceController {
    constructor(private compService: ComplianceService, private jwtService: JwtService, private userService: UserService, private cloudinaryService: CloudinaryService) {}    

    @Post("/new")
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'nin', maxCount: 1 },
        { name: 'cert', maxCount: 1 },
        { name: 'doc', maxCount: 1 },
      ]))
    async addCompliance(@Query("access_token") access_token: string,@Body(ValidationPipe) createCompDto: CreateCompDto, 
        @UploadedFiles() files: {
            nin?: Express.Multer.File[],
            cert?: Express.Multer.File[],
            doc?: Express.Multer.File[],
        }, 
        payload ){
        try{ 
            if (files.nin) {
                const uploadedImage = await this.cloudinaryService.uploadNin(files.nin[0], 'image', 'NIN');
                createCompDto.imageUrl = uploadedImage.secure_url;
                // console.log("imageUrl",createCompDto.imageUrl)
            }else{
                createCompDto.imageUrl = null;
            }
            if (files.cert) {
                const uploadedCert = await this.cloudinaryService.uploadCert(files.cert[0], 'image', 'CERT');
                createCompDto.certUrl = uploadedCert.secure_url;
                // console.log("certUrl",createCompDto.certUrl)
            }else{
                createCompDto.certUrl = null;
            }
            if (files.doc) {
                const uploadedMemo = await this.cloudinaryService.uploadDoc(files.doc[0], 'raw', 'DOC');
                createCompDto.docUrl = uploadedMemo.secure_url;
                // console.log("memoUrl",createCompDto.memoUrl)
            }else{
                createCompDto.docUrl = null; 
            }
    
            const user = await this.jwtService.decode(access_token);
            if(!user) {throw new NotFoundException("Invalid Token")};
            payload = user
            // console.log(payload)
            const timeInSeconds = Math.floor(Date.now() / 1000); 
            if (payload.exp && payload.exp < timeInSeconds) {
            throw new UnauthorizedException("Token has expired");
            }
            const id = user.sub;
            const getUser = await this.userService.findById(id);
            const data = await this.compService.createComp(createCompDto, getUser);
            // console.log("compliance controller",data);
            return data;
        }catch(err){
            // console.log("4",err.message)
            if(err instanceof NotFoundException) {
                throw new NotFoundException(err.message)
                // console.log('5',err.message)
            }
            if(err instanceof UnauthorizedException) {
                throw new UnauthorizedException(err.message)
                // console.log("6",err.message)
            }
            throw new UnauthorizedException(err)
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
  