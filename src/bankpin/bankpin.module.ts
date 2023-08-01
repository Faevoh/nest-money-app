import { Module } from '@nestjs/common';
import { BankpinService } from './bankpin.service';
import { BankPin } from 'src/Entities/pinCreation';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BankPin])],
  providers: [BankpinService],
  exports: [BankpinService]
})
export class BankpinModule {}
