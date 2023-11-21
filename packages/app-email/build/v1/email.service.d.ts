import { ConfigService } from "@dev/config";
import * as Mail from "nodemailer/lib/mailer";
export declare class EmailService {
    private readonly configService;
    private nodeMailerTransport;
    constructor(configService: ConfigService);
    sendEmail(options: Mail.Options): Promise<any>;
}
