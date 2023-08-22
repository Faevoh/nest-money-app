import { BadRequestException, Body, Controller, Get, Headers, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, UnauthorizedException, UploadedFile, UseInterceptors, ValidationPipe } from '@nestjs/common';
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
    @UseInterceptors(FileInterceptor('nin'))
    @UseInterceptors(FileInterceptor('cert'))
    @UseInterceptors(FileInterceptor('memo'))
    async addCompliance(@Query("access_token") access_token: string,@Body(ValidationPipe) createCompDto: CreateCompDto, 
        @UploadedFile() ninfile: Express.Multer.File,  
        @UploadedFile() certfile: Express.Multer.File,  
        @UploadedFile() memofile: Express.Multer.File, 
        payload ){
            console.log("Where is the problem from")
            console.log('Received request with createCompDto:', createCompDto);
            console.log('Received request with ninfile:', ninfile);
            console.log('Received request with certfile:', certfile);
            console.log('Received request with memofile:', memofile);
        // try{ 
        //     if (ninfile) {
        //         const uploadedImage = await this.cloudinaryService.uploadNin(ninfile, 'image', 'NIN');
        //         createCompDto.imageUrl = uploadedImage.secure_url;
        //         // console.log("2",createCompDto.imageUrl)
        //     }else{
        //         console.log("nin not avaliable","1")
        //     }
        //     if (certfile) {
        //         const uploadedCert = await this.cloudinaryService.uploadCert(certfile, 'image', 'CERT');
        //         createCompDto.certUrl = uploadedCert.secure_url;
        //         console.log("2",createCompDto.certUrl)
        //     }else{
        //         console.log("cert not avaliable","2")
        //     }
        //     if (memofile) {
        //         const uploadedMemo = await this.cloudinaryService.uploadMemo(memofile, 'raw', 'MEMO');
        //         createCompDto.memoUrl = uploadedMemo.secure_url;
        //         console.log("3",createCompDto.memoUrl)
        //     }else{
        //         console.log("memo not avaliable","3")
        //     }
    
        //     const user = await this.jwtService.decode(access_token);
        //     if(!user) {throw new NotFoundException("Invalid Token")};
        //     payload = user
        //     // console.log(payload)
        //     const timeInSeconds = Math.floor(Date.now() / 1000); 
        //     if (payload.exp && payload.exp < timeInSeconds) {
        //     throw new UnauthorizedException("Token has expired");
        //     }
        //     const id = user.sub;
        //     const getUser = await this.userService.findById(id);
        //     const data = await this.compService.createComp(createCompDto, getUser);
        //     // console.log(data);
        //     return data;
        // }catch(err){
        //     console.log("4",err.message)
        //     if(err instanceof NotFoundException) {
        //         // throw new NotFoundException(err.message)
        //         console.log('5',err.message)
        //     }
        //     if(err instanceof UnauthorizedException) {
        //         // throw new UnauthorizedException(err.message)
        //         console.log("6",err.message)
        //     }
        //     // throw new UnauthorizedException(err)
        // }
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
  