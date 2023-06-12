import { Module } from '@nestjs/common';
import { AirtimeController } from './airtime.controller';
import { AirtimeService } from './airtime.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airtime } from 'src/Entities/airtimeEntity.entity';
import { WalletModule } from 'src/wallet/wallet.module';

@Module({
  imports: [TypeOrmModule.forFeature([Airtime]), WalletModule],
  controllers: [AirtimeController],
  providers: [AirtimeService]
})
export class AirtimeModule {}
