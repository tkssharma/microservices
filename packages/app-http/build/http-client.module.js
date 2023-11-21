"use strict";
var HttpClientModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClientModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const http_client_constants_1 = require("./http-client.constants");
const http_client_provider_1 = require("./http-client.provider");
let HttpClientModule = HttpClientModule_1 = class HttpClientModule {
    static forRoot(options) {
        const provider = (0, http_client_provider_1.createHttpClientProvider)(options);
        return {
            module: HttpClientModule_1,
            providers: [provider],
            exports: [provider],
        };
    }
    static forRootAsync(options) {
        const provider = {
            inject: [http_client_constants_1.HTTP_CLIENT_MODULE_OPTIONS],
            provide: http_client_constants_1.HTTP_CLIENT_TOKEN,
            useFactory: async (options) => {
                return (0, http_client_provider_1.getHttpClientModuleOptions)(options);
            },
        };
        return {
            module: HttpClientModule_1,
            imports: options.imports,
            providers: [...this.createAsyncProviders(options), provider],
            exports: [provider],
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        const useClass = options.useClass;
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: useClass,
                useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: http_client_constants_1.HTTP_CLIENT_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        const inject = [
            (options.useClass ||
                options.useExisting),
        ];
        return {
            provide: http_client_constants_1.HTTP_CLIENT_MODULE_OPTIONS,
            useFactory: async (optionsFactory) => await optionsFactory.createHttpModuleOptions(),
            inject,
        };
    }
};
HttpClientModule = HttpClientModule_1 = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], HttpClientModule);
exports.HttpClientModule = HttpClientModule;
