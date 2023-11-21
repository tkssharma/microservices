"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHttpClientProvider = exports.getHttpClientModuleOptions = void 0;
const http_client_constants_1 = require("./http-client.constants");
const http_client_service_1 = require("./http-client.service");
const getHttpClientModuleOptions = (options) => {
    return new http_client_service_1.HttpClientService(options);
};
exports.getHttpClientModuleOptions = getHttpClientModuleOptions;
function createHttpClientProvider(options) {
    return {
        provide: http_client_constants_1.HTTP_CLIENT_TOKEN,
        useValue: (0, exports.getHttpClientModuleOptions)(options),
    };
}
exports.createHttpClientProvider = createHttpClientProvider;
