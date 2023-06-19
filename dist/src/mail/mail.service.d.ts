import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/Entities/userEntity.entity';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendMail(url: string, user: User): Promise<boolean>;
}
