import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStraregy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    secret: process.env.SECRET,
    signOptions: {
      algorithm: "HS512",
      expiresIn: process.env.EXPIRES_IN
    }
  })],
  providers: [AuthService, LocalStraregy],
  exports: [AuthService]
})
export class AuthModule {}
