import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/Entities/userEntity.entity';
@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(url: string, user: User) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Reset Password Notification',
        template: './template',
        context: {
          url: url,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}