import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/Entities/userEntity.entity';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    loginMail(text: string, link: string, user: User): Promise<boolean>;
    sendMail(url: string, user: User): Promise<boolean>;
    VerifyMail(text: string, link: string, user: User): Promise<boolean>;
}
