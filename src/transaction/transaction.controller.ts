import { Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Post, Query, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { User } from 'src/Entities/userEntity.entity';
import { Transactions } from 'src/Entities/transactionEntity.entity';
import { UserService } from 'src/user/user.service';
import { Wallet } from 'src/Entities/walletEntity.entity';
import { WalletService } from 'src/wallet/wallet.service';
import { Compliances } from 'src/Entities/compEntity.entity';
import { ComplianceService } from 'src/compliance/compliance.service';
import { UserPinDto } from 'src/DTO/pindto';
import { JwtService } from '@nestjs/jwt';

@Controller('transaction')
export class TransactionController {
    constructor(private transactionService: TransactionService, private userService: UserService, private walletService: WalletService, private compService: ComplianceService, private jwtService: JwtService) {}

    @Post("/deposit/:id/:walletid")
    async depositTransaction(@Body(ValidationPipe) requestBody, user: User, wallet: Wallet , @Query("access_token") access_token: string, payload,@Param("id", ParseIntPipe) id: number, @Param("walletid", ParseIntPipe) walletid: number) {
        const transaction = requestBody.transaction as Transactions;
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

        const userData = await this.userService.findById(id)
        transaction.userId = userData.id

        const walletdata = await this.walletService.findById(walletid)
        // console.log(walletdata)

        walletdata.accountBalance += transaction.amount
        console.log(walletdata.accountBalance)

        const savedWallet = await this.walletService.saveWallet(walletdata)
        // console.log(savedWallet)

        // console.log(userData)
        const maindata = await this.transactionService.credit(transaction, user, wallet)

        return{statusCode: 201, message: "Deposit has been made", data: maindata}
    }

    @Post("/withdrawal/:id/:walletid")
    async withdrawalTransaction(@Body(ValidationPipe) transaction: Transactions, user: User, wallet: Wallet , comp:Compliances, @Param("id", ParseIntPipe) id: number, @Param("walletid", ParseIntPipe) walletid: number) {
        const userData = await this.userService.findById(id)
        transaction.userId = userData.id

        const walletdata = await this.walletService.findById(walletid)
        // console.log(walletdata)

        if(walletdata.accountBalance === 0|| walletdata.accountBalance < 0 || walletdata.accountBalance <transaction.amount){

            throw new InternalServerErrorException("Insufficient Balance")
        }

        walletdata.accountBalance -= transaction.amount
        // console.log(walletdata.accountBalance)

        await this.walletService.saveWallet(walletdata)

        const compData = await this.compService.findByUserId(id)
        // console.log(compData)

        const maindata = await this.transactionService.debit(transaction, user, wallet, comp)

        // if(compData.bankCode === transaction.transactionPin){
        //     await maindata
        // }

        return {statusCode: 201, message: "success, Withdrawal Made", data: maindata}
        // console.log(userData)
        
    }    

    @Get("/dashboard/:userId")
    async DashBoard(@Param("userId", ParseIntPipe) userId: number) {
        const walletdata = await this.walletService.findByUserId(userId)
        const accountBalance = walletdata.accountBalance;

        const deposits = await this.transactionService.findTransaction("deposit")

        const withdrawals = await this.transactionService.findTransaction("withdrawal")

        const totalTransactions = await this.transactionService.allTransactions()

        return{accountBalance, totalTransactions , deposits, withdrawals}
    }

    @Get("/:id")
    async singleTransaction(@Param("id", ParseIntPipe) id: number) {
        const data = await this.transactionService.findOneTransaction(id)

        return {statusCode: 200, message: "Success", data: data}
    }
}
