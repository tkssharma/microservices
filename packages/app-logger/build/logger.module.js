"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLoggerModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const logger_service_1 = require("./logger.service");
const logger_middleware_1 = require("./logger.middleware");
let AppLoggerModule = class AppLoggerModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes("*");
    }
};
AppLoggerModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [],
        providers: [logger_service_1.MyLoggerService],
        exports: [logger_service_1.MyLoggerService],
    })
], AppLoggerModule);
exports.AppLoggerModule = AppLoggerModule;
