export declare class MyLoggerService {
    private context;
    private readonly logger;
    constructor(context: string);
    error(message: string, _trace?: string): void;
    log(message: string): void;
    warn(message: string): void;
    info(message: string): void;
}
