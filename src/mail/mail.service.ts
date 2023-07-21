import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/Entities/userEntity.entity';
@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  // async loginMail(text: string, link: string, user: User) {
  //   try {
  //     await this.mailerService.sendMail({
  //       to: user.email,
  //       subject: `Login to Money App`,
  //       template: './loginMail',
  //       context: {
  //         text: text,
  //         link: link
  //       },
  //     });
  //     // console.log(user.email)
  //     return true;
  //   } catch (error) {
  //     // console.log(error);
  //     return false;
  //   }
  // }

  async sendMail(url: string, user: User) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Reset Password Notification',
        template: './resetPassword',
        context: {
          url: url,
        },
      });
      return true;
    } catch (error) {
      // console.log(error);
      return false;
    }
  }

  async VerifyMail(text: string, link: string, user: User) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: `Verify your Money App account`,
        template: './verifyEmail',
        context: {
          text: text,
          link: link
        },
      });
      // console.log(user.email)
      return true;
    } catch (error) {
      // console.log(error);
      return false;
    }
  }
}