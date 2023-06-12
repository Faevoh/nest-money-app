import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from 'src/Entities/transactionEntity.entity';
import { UserModule } from 'src/user/user.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { ComplianceModule } from 'src/compliance/compliance.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transactions]), UserModule, WalletModule, ComplianceModule],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}
