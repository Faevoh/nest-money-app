import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { dataSourceOptions } from 'db/data-source';
import { AuthModule } from './auth/auth.module';
import { ComplianceModule } from './compliance/compliance.module';
import { AirtimeModule } from './airtime/airtime.module';
import { MailModule } from './mail/mail.module';
import { WalletModule } from './wallet/wallet.module';
import { TransactionModule } from './transaction/transaction.module';
import mailConfig from './config/mail.config';
import { hostDataSourceOptions } from 'db/host-data-source';

@Module({
  imports: [ ConfigModule.forRoot({
    envFilePath: [".env"],
    isGlobal: true
  }),TypeOrmModule.forRoot(hostDataSourceOptions),
  UserModule, AuthModule, ComplianceModule, AirtimeModule, MailModule, ConfigModule.forRoot({ 
    isGlobal: true,
    cache: true,
    load: [
      mailConfig,
    ],
    expandVariables: true,}), WalletModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}



// ,TypeOrmModule.forRoot(hostDataSourceOptions)