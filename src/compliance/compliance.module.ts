import { Module, forwardRef } from '@nestjs/common';
import { ComplianceController } from './compliance.controller';
import { ComplianceService } from './compliance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compliances } from 'src/Entities/compEntity.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { User } from 'src/Entities/userEntity.entity';
import { Wallet } from 'src/Entities/walletEntity.entity';
import { WalletService } from 'src/wallet/wallet.service';
import { accountGenerator } from 'src/auth/generator.service';
import { MailService } from 'src/mail/mail.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { BankPin } from 'src/Entities/pinCreation';

@Module({
  imports: [TypeOrmModule.forFeature([Compliances, User, Wallet]),JwtModule.register({
    secret: process.env.SECRET,
    signOptions: {
      algorithm: "HS512",
      expiresIn: process.env.EXPIRES_IN
    }
  }), UserModule, AuthModule],
  controllers: [ComplianceController],
  providers: [ComplianceService, UserService, WalletService, accountGenerator, MailService, AuthService, CloudinaryService
  ],
  exports: [ComplianceService]
})
export class ComplianceModule {}
