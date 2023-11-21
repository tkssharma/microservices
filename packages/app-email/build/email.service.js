"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const nodemailer_1 = require("nodemailer");
const email_interface_1 = require("./email.interface");
let EmailService = class EmailService {
    constructor(options) {
        this.options = options;
        this.nodeMailerTransport = (0, nodemailer_1.createTransport)({
            service: this.options.service,
            auth: {
                user: this.options.user,
                pass: this.options.pass,
            },
        });
    }
    sendEmail(options) {
        return this.nodeMailerTransport.sendMail(options);
    }
};
EmailService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(email_interface_1.EMAIL_CONFIG_OPTIONS))
], EmailService);
exports.EmailService = EmailService;
