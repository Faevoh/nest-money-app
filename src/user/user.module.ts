import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entities/userEntity.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { MailService } from 'src/mail/mail.service';
import { WalletModule } from 'src/wallet/wallet.module';
import { accountGenerator } from 'src/auth/generator.service';
import { AccountType } from 'src/Entities/accountEntity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, AccountType]), PassportModule, WalletModule, JwtModule.register({
    secret: process.env.SECRET,
    signOptions: {
      algorithm: "HS512",
      expiresIn: process.env.EXPIRES_IN
    }
  })],
  controllers: [UserController],
  providers: [UserService,AuthService,JwtStrategy,MailService, accountGenerator],
  exports: [UserService, PassportModule]
})
export class UserModule {}
