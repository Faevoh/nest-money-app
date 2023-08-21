import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from 'src/Entities/transactionEntity.entity';
import { UserModule } from 'src/user/user.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { ComplianceModule } from 'src/compliance/compliance.module';
import { JwtService } from '@nestjs/jwt';
import { BankpinService } from 'src/bankpin/bankpin.service';
import { BankPin } from 'src/Entities/pinCreation';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transactions, BankPin]), UserModule, WalletModule, ComplianceModule],
  controllers: [TransactionController],
  providers: [TransactionService, JwtService, BankpinService, MailService]
})
export class TransactionModule {}
