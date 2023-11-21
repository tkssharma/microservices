"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CONFIG = void 0;
exports.DEFAULT_CONFIG = {
    port: Number(process.env.PORT || 3001),
    env: "production",
    db: {
        url: process.env.DATABASE_URL,
    },
    swagger: {
        username: "",
        password: "",
    },
    auth: {
        secret: "",
        expiry: "",
    },
    logLevel: "",
    email: {
        service_name: "",
        username: "",
        password: "",
    },
    externalApi: {
        apiUrl: "",
        apiKey: "",
    },
};
