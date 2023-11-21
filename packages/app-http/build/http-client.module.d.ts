import { DynamicModule } from "@nestjs/common";
import { HttpClientModuleAsyncOptions, HttpClientModuleOptions } from "./http-client.interface";
export declare class HttpClientModule {
    static forRoot(options: HttpClientModuleOptions): DynamicModule;
    static forRootAsync(options: HttpClientModuleAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
