import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ComplianceModule } from './compliance/compliance.module';
import { AirtimeModule } from './airtime/airtime.module';
import { MailModule } from './mail/mail.module';
import { WalletModule } from './wallet/wallet.module';
import { TransactionModule } from './transaction/transaction.module';
import mailConfig from './config/mail.config';
import { hostDataSourceOptions } from 'db/host-data-source';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BankpinModule } from './bankpin/bankpin.module';

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
    expandVariables: true,
  }), ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..'),
  }), WalletModule, TransactionModule, CloudinaryModule, BankpinModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}


// TypeOrmModule.forRoot(dataSourceOptions),
// ,TypeOrmModule.forRoot(hostDataSourceOptions)