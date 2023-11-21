"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClientService = void 0;
const tslib_1 = require("tslib");
const axios_1 = require("axios");
const common_1 = require("@nestjs/common");
const http_client_constants_1 = require("./http-client.constants");
let HttpClientService = class HttpClientService {
    constructor(options) {
        this.options = options;
        this.apiUrl = this.options.apiUrl;
        this.apiKey = this.options.apiKey;
    }
    async fetch(method, data) {
        return (0, axios_1.default)({
            method,
            data,
            url: `${this.apiUrl}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.apiKey}`,
            },
        });
    }
};
HttpClientService = tslib_1.__decorate([
    tslib_1.__param(0, (0, common_1.Inject)(http_client_constants_1.HTTP_CLIENT_MODULE_OPTIONS))
], HttpClientService);
exports.HttpClientService = HttpClientService;
