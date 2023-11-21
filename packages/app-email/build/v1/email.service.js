"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const nodemailer_1 = require("nodemailer");
let EmailService = class EmailService {
    constructor(configService) {
        this.configService = configService;
        this.nodeMailerTransport = (0, nodemailer_1.createTransport)({
            service: this.configService.get().email.service_name,
            auth: {
                user: this.configService.get().email.username,
                pass: this.configService.get().email.password,
            },
        });
    }
    sendEmail(options) {
        return this.nodeMailerTransport.sendMail(options);
    }
};
EmailService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], EmailService);
exports.EmailService = EmailService;
