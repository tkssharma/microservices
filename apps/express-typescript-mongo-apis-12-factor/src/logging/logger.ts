import * as winston from "winston";
const { combine, timestamp, printf, colorize, align } = winston.format;

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "http",
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "app_info.log",
      level: "info",
    }),
    new winston.transports.File({
      filename: "app-error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "app-http.log",
      level: "http",
    }),
  ],
});
