import { Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Post, Query, UnauthorizedException, UseGuards, ValidationPipe } from '@nestjs/common';
import { AirtimeService } from './airtime.service';
import { CreateAirtimeDto } from 'src/DTO/createAirtime';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Wallet } from 'src/Entities/walletEntity.entity';
import { WalletService } from 'src/wallet/wallet.service';
import { BankpinService } from 'src/bankpin/bankpin.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { UserPinDto } from 'src/DTO/pindto';

@Controller('airtime')
export class AirtimeController {
    constructor(private airtimeService: AirtimeService, private walletService: WalletService, private pinService: BankpinService, private jwtService: JwtService) {}

    @Post("/airtime-recharge")
    async recharge(@Body(ValidationPipe) requestBody, wallet:Wallet,@Query("access_token") access_token: string, payload) {
        const createAirtimeDto = requestBody.createAirtimeDto as CreateAirtimeDto;
        console.log(createAirtimeDto)
        const userPinDto = requestBody.userPinDto as UserPinDto;

        const tokenDecode = this.jwtService.decode(access_token);
        if(!tokenDecode) {throw new NotFoundException("Invalid Token")};
        payload = tokenDecode
        const timeInSeconds = Math.floor(Date.now() / 1000); 
        if (payload.exp && payload.exp < timeInSeconds) {
        throw new UnauthorizedException("Token has expired");
        }
        
        const userId = tokenDecode.sub;
        console.log(userId)

        const walletData = await this.walletService.findByUserId(userId)

        const {amount} = createAirtimeDto

        if(walletData.accountBalance === 0|| walletData.accountBalance < 0 || walletData.accountBalance < amount){

            throw new UnauthorizedException("Insufficient Balance, Can't process Airtime")
        }

        walletData.accountBalance -= createAirtimeDto.amount
        await this.walletService.saveWallet(walletData)

        const {bankPin} = userPinDto;
        const user = await this.pinService.findByUserId(userId)
        console.log(user)
        const pinDecode = await bcrypt.compare(bankPin, user.bankPin)
        if(!pinDecode) {
            throw new UnauthorizedException("Invalid Pin")
        }
        const newRecharge = await this.airtimeService.recharge(createAirtimeDto, wallet)

        return {statusCode: 201, message: "Success", data: newRecharge }
    }

    @Get()
    async getAll() {
        const allRecharge = await this.airtimeService.allRecharge()
        if(allRecharge.length === 0){ return {statusCode: 404, message: "No Recharge transaction has been made"}}
        
        return {statusCode: 200, message: "Success", data: allRecharge}
    }
    
}
