import { BadRequestException, Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Post, Query, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { WalletService } from 'src/wallet/wallet.service';
import { UserPinDto } from 'src/DTO/pindto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { TransferDto } from 'src/DTO/transfer';
import { BankpinService } from 'src/bankpin/bankpin.service';
import { DepositDto } from 'src/DTO/deposit';
import { CreateAirtimeDto } from 'src/DTO/createAirtime';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/mail/mail.service';

@Controller('transaction')
export class TransactionController {
    constructor(private transactionService: TransactionService, private walletService: WalletService, private jwtService: JwtService, private pinService: BankpinService, private userService: UserService, private mailService: MailService) {}

    @Post("/transfer")
    async transferTransaction(@Body(ValidationPipe) transferDto: TransferDto, @Body(ValidationPipe) userPinDto: UserPinDto, @Query("access_token") access_token: string, payload) {
       try{
        const tokenDecode = this.jwtService.decode(access_token);
        if(!tokenDecode) {throw new NotFoundException("Invalid Token")};
        payload = tokenDecode
        const timeInSeconds = Math.floor(Date.now() / 1000); 
        if (payload.exp && payload.exp < timeInSeconds) {
        throw new UnauthorizedException("Token has expired");
        }      
        const userid = tokenDecode.sub;

        const users = await this.userService.findById(userid)

        const recieverAccount = transferDto.accountNumber
        const recieverdetails = await this.walletService.findByUserAcc(recieverAccount)
        const recieverData = await this.userService.findById( recieverdetails.userId)

        const {bankPin} = userPinDto;
        // console.log("bankpin", bankPin)
        const user = await this.pinService.findByUserId(userid)
        // console.log("user11", user)
        console.log("user bankpin", user.bankPin)
        const pinDecode = await bcrypt.compare(bankPin, user.bankPin)
        if(!pinDecode) {
            throw new UnauthorizedException("Invalid Pin")
        }

        const transferdata ={
            ...transferDto,
            recieverName: `${recieverData.lastName} ${recieverData.firstName}` ,
            userId: userid,
            status: "success",
            payMethod: "transfer"
        }
        // console.log("transferuserdata", transferdata)
        const walletdata = await this.walletService.findByUserId(userid)
        if(walletdata.accountBalance === 0|| walletdata.accountBalance < 0 || walletdata.accountBalance <transferDto.amount){
            throw new BadRequestException("Insufficient Funds")
        }

        if(!recieverdetails){
            throw new NotFoundException("Couldn't find user with Account Number")
        }

        walletdata.accountBalance -= transferDto.amount
        recieverdetails.accountBalance += transferDto.amount

        const savedWallet = await this.walletService.saveWallet(walletdata)
        const saveWallet = await this.walletService.saveWallet(recieverdetails)

        const maindata = await this.transactionService.transaction(transferdata)

        delete maindata.CVV
        delete maindata.cardNumber
        delete maindata.expiryDate
        delete maindata.phoneNumber
        delete maindata.serviceNetwork
        delete userPinDto.bankPin

        const recievrTransaction = await this.transactionService.transaction({
            userId: recieverData.id,
            amount: transferDto.amount,
            senderName: `${users.lastName} ${users.firstName}`,
            status: "success",
            payMethod: "deposit",
            narration: transferDto.narration
        })
        // console.log("recieveruserdata",recievrTransaction)
        await this.userService.addToUserTransaction(recievrTransaction, recieverData.id)

        const text = `Hey ${recieverData.firstName},
        A deposit of ${transferDto.amount} was sent to you on ${recievrTransaction.createDate}.
        Check your app for other info.`

        await this.mailService.DepositMail(text, recieverData)

        const texts = `Hey ${users.firstName},
        A transfer of ${transferDto.amount} was made to on ${maindata.createDate}.
        Check your app for other info.`

        await this.mailService.TransferMail(texts, users)
        // console.log("user's maindata", maindata)
        return{statusCode: 201, message: "Transfer successful", data: maindata.transactionRef}
        
       }catch(err){
        console.log(err)
        if(err instanceof UnauthorizedException) {
            throw new UnauthorizedException(err.message)
        }
        if(err instanceof NotFoundException) {
            throw new NotFoundException(err.message)
        }
        if(err instanceof BadRequestException) {
            throw new BadRequestException(err.message)
        }
        throw new BadRequestException("Could not Process Transfer", err.message)
       }
    }

    @Post("/deposit")
    async depositTransaction(@Body(ValidationPipe) depositDto: DepositDto, @Query("access_token") access_token: string, payload) {
       try{
        const tokenDecode = this.jwtService.decode(access_token);
        if(!tokenDecode) {throw new NotFoundException("Invalid Token")};
        payload = tokenDecode
        const timeInSeconds = Math.floor(Date.now() / 1000); 
        if (payload.exp && payload.exp < timeInSeconds) {
        throw new UnauthorizedException("Token has expired");
        }      
        const userid = tokenDecode.sub;

        const user = await this.userService.findById(userid)

        const depositdata ={
            ...depositDto,
            userId: userid,
            status: "success",
            payMethod: "deposit"
        }

        const walletdata = await this.walletService.findByUserId(userid)

        walletdata.accountBalance += depositDto.amount

        const savedWallet = await this.walletService.saveWallet(walletdata)

        const maindata = await this.transactionService.transaction(depositdata)

        delete maindata.accountNumber
        delete maindata.narration
        delete maindata.CVV
        delete maindata.cardNumber
        delete maindata.expiryDate
        delete maindata.phoneNumber
        delete maindata.serviceNetwork

        const text = `Hey ${user.firstName},
        A deposit of ${depositDto.amount} was made by you on ${maindata.createDate}.
        Check your app for other info.`

        await this.mailService.DepositMail(text, user)

        return{statusCode: 201, message: "Deposit successful", data: maindata.transactionRef}
        
       }catch(err){
        // console.log(err.message)
        if(err instanceof UnauthorizedException) {
            throw new UnauthorizedException(err.message)
        }
        if(err instanceof NotFoundException) {
            throw new NotFoundException(err.message)
        }
        throw new BadRequestException("Could not Process Deposit")
       }
    } 

    @Post("/airtime-recharge")
    async recharge(@Body(ValidationPipe) createAirtimeDto: CreateAirtimeDto,@Body(ValidationPipe) userPinDto: UserPinDto, @Query("access_token") access_token: string, payload) {
        try{
            const tokenDecode = this.jwtService.decode(access_token);
            if(!tokenDecode) {throw new NotFoundException("Invalid Token")};
            payload = tokenDecode
            const timeInSeconds = Math.floor(Date.now() / 1000); 
            if (payload.exp && payload.exp < timeInSeconds) {
            throw new UnauthorizedException("Token has expired");
            }
            
            const userId = tokenDecode.sub;

            const users = await this.userService.findById(userId)

            const airtimedata ={
                ...createAirtimeDto,
                userId: userId,
                status: "success",
                payMethod: "airtime"
            }

            const walletData = await this.walletService.findByUserId(userId)

            const {amount} = createAirtimeDto

            if(walletData.accountBalance === 0|| walletData.accountBalance < 0 || walletData.accountBalance < amount){

                throw new UnauthorizedException("Insufficient Funds")
            }

            walletData.accountBalance -= createAirtimeDto.amount
            await this.walletService.saveWallet(walletData)

            const {bankPin} = userPinDto;
            const user = await this.pinService.findByUserId(userId)
            const pinDecode = await bcrypt.compare(bankPin, user.bankPin)
            if(!pinDecode) {
                throw new UnauthorizedException("Invalid Pin")
            }
            const newRecharge = await this.transactionService.recharge(airtimedata)

            delete newRecharge.accountNumber
            delete newRecharge.narration
            delete newRecharge.CVV
            delete newRecharge.cardNumber
            delete newRecharge.expiryDate
            delete userPinDto.bankPin

            const texts = `Hey ${users.firstName},
            You account has been deducted of ${createAirtimeDto.amount} for the Airtime Transactio that was made to on ${newRecharge.createDate}.`
            await this.mailService.AirtimeMail(texts, users)

            return {statusCode: 201, message: "Successful Recharge", data: newRecharge.transactionRef}
        }catch(err){
            if(err instanceof UnauthorizedException) {
            throw new UnauthorizedException(err.message)
            }
            if(err instanceof NotFoundException) {
                throw new NotFoundException(err.message)
            }
            throw new BadRequestException("Could not Process Airtime")
        }
    }

    @Get()
    async singleTransaction(@Query("access_token") access_token: string, payload, @Query("transactionRef") transactionRef: string) {

        const tokenDecode = this.jwtService.decode(access_token);
        if(!tokenDecode) {throw new NotFoundException("Invalid Token")};
        payload = tokenDecode
        const timeInSeconds = Math.floor(Date.now() / 1000); 
        if (payload.exp && payload.exp < timeInSeconds) {
        throw new UnauthorizedException("Token has expired");
        }      
        const userid = tokenDecode.sub;
        const data = await this.transactionService.findByUserId(transactionRef)

        if(data.payMethod === "transfer"){
            delete data.CVV
            delete data.cardNumber
            delete data.expiryDate
            delete data.phoneNumber
            delete data.serviceNetwork
        }

        if(data.payMethod === "airtime"){
            delete data.CVV
            delete data.cardNumber
            delete data.expiryDate
            delete data.senderName
            delete data.accountNumber
            delete data.narration
        }

        if(data.payMethod === "deposit"){
            delete data.accountNumber
            delete data.narration
            delete data.phoneNumber
            delete data.serviceNetwork
            delete data.CVV
            delete data.cardNumber
            delete data.expiryDate
        }

        return {statusCode: 200, message: "Success", data: data}
    }
    
}
