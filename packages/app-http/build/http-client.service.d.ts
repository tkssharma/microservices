import { AxiosResponse } from "axios";
import { HttpClientModuleOptions } from "./http-client.interface";
export declare class HttpClientService {
    private readonly options;
    private apiUrl;
    private apiKey;
    constructor(options: HttpClientModuleOptions);
    fetch(method: string, data: any): Promise<AxiosResponse<any>>;
}
