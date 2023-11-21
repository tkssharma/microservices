import { DynamicModule } from "@nestjs/common";
import EmailAsyncOptions, { EmailOptions } from "./email.interface";
export declare class EmailModule {
    static register(options: EmailOptions): DynamicModule;
    static registerAsync(options: EmailAsyncOptions): DynamicModule;
}
