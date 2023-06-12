import { Module } from '@nestjs/common';
import { ComplianceController } from './compliance.controller';
import { ComplianceService } from './compliance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compliances } from 'src/Entities/compEntity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Compliances])],
  controllers: [ComplianceController],
  providers: [ComplianceService],
  exports: [ComplianceService]
})
export class ComplianceModule {}
