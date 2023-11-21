import { Provider } from "@nestjs/common";
import { HttpClientModuleOptions } from "./http-client.interface";
import { HttpClientService } from "./http-client.service";
export declare const getHttpClientModuleOptions: (options: HttpClientModuleOptions) => HttpClientService;
export declare function createHttpClientProvider(options: HttpClientModuleOptions): Provider;
