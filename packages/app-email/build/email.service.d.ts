import * as Mail from "nodemailer/lib/mailer";
import { EmailOptions } from "./email.interface";
export declare class EmailService {
    private options;
    private nodeMailerTransport;
    constructor(options: EmailOptions);
    sendEmail(options: Mail.Options): Promise<any>;
}
