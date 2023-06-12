import { Body, Controller, Get, InternalServerErrorException, Param, ParseIntPipe, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AirtimeService } from './airtime.service';
import { CreateAirtimeDto } from 'src/DTO/createAirtime';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Wallet } from 'src/Entities/walletEntity.entity';
import { WalletService } from 'src/wallet/wallet.service';

@Controller('airtime')
export class AirtimeController {
    constructor(private airtimeService: AirtimeService, private walletService: WalletService) {}

    @Post("/airtime-recharge/:userId")
    async recharge(@Body(ValidationPipe) createAirtimeDto: CreateAirtimeDto, wallet:Wallet, @Param("userId", ParseIntPipe) userId:number) {
        const walletData = await this.walletService.findByUserId(userId)

        if(walletData.accountBalance === 0|| walletData.accountBalance < 0 || walletData.accountBalance < createAirtimeDto.amount){

            throw new InternalServerErrorException("Insufficient Balance, Can't process Airtime")
        }

        walletData.accountBalance -= createAirtimeDto.amount
        await this.walletService.saveWallet(walletData)

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
