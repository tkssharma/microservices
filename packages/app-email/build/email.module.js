"use strict";
var EmailModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const email_service_1 = require("./email.service");
const email_interface_1 = require("./email.interface");
let EmailModule = EmailModule_1 = class EmailModule {
    static register(options) {
        return {
            module: EmailModule_1,
            providers: [
                {
                    provide: email_interface_1.EMAIL_CONFIG_OPTIONS,
                    useValue: options,
                },
                email_service_1.EmailService,
            ],
        };
    }
    static registerAsync(options) {
        return {
            module: EmailModule_1,
            imports: options.imports,
            providers: [
                {
                    provide: email_interface_1.EMAIL_CONFIG_OPTIONS,
                    useFactory: options.useFactory,
                    inject: options.inject,
                },
                email_service_1.EmailService,
            ],
            exports: [email_service_1.EmailService],
        };
    }
};
EmailModule = EmailModule_1 = tslib_1.__decorate([
    (0, common_1.Module)({})
], EmailModule);
exports.EmailModule = EmailModule;
