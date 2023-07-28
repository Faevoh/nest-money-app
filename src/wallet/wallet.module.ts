import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from 'src/Entities/walletEntity.entity';
import { accountGenerator } from 'src/auth/generator.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
  controllers: [WalletController],
  providers: [WalletService, accountGenerator],
  exports: [WalletService]
})
export class WalletModule {}
