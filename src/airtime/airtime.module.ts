import { Module } from '@nestjs/common';
import { AirtimeController } from './airtime.controller';
import { AirtimeService } from './airtime.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airtime } from 'src/Entities/airtimeEntity.entity';
import { WalletModule } from 'src/wallet/wallet.module';
import { BankpinService } from 'src/bankpin/bankpin.service';
import { BankPin } from 'src/Entities/pinCreation';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Airtime, BankPin]), WalletModule],
  controllers: [AirtimeController],
  providers: [AirtimeService, BankpinService, JwtService]
})
export class AirtimeModule {}
