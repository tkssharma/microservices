"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailModule = void 0;
const tslib_1 = require("tslib");
const config_1 = require("@dev/config");
const common_1 = require("@nestjs/common");
const email_service_1 = require("./email.service");
let EmailModule = class EmailModule {
};
EmailModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        controllers: [],
        providers: [email_service_1.EmailService],
        exports: [email_service_1.EmailService],
    })
], EmailModule);
exports.EmailModule = EmailModule;
