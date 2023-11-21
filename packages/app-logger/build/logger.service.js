"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyLoggerService = void 0;
const winston = require("winston");
const loglevel_1 = require("./loglevel");
const moment = require("moment");
const formatter = winston.format((info) => {
    if (info.level === loglevel_1.LogLevel.HTTP) {
        // HTTP messages are already formatted by the middleware, so just pass through
        return info;
    }
    info.message = `[${moment().format("ddd MMM DD HH:mm:ss YYYY")}] [${info.level}] ${info.message}`;
    return info;
});
class MyLoggerService {
    constructor(context) {
        this.context = context;
        this.logger = winston.createLogger({
            level: process.env.LOG_LEVEL,
            format: formatter(),
        });
        this.logger.add(new winston.transports.Console({
            format: winston.format.json(),
            stderrLevels: [loglevel_1.LogLevel.Error, loglevel_1.LogLevel.Warn],
        }));
    }
    error(message, _trace) {
        this.logger.error(message, {
            context: this.context,
        });
    }
    log(message) {
        this.logger.log(message, { context: this.context });
    }
    warn(message) {
        this.logger.warn(message, { context: this.context });
    }
    info(message) {
        this.logger.info(message, { context: this.context });
    }
}
exports.MyLoggerService = MyLoggerService;
