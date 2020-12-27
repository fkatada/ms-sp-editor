/**
 * XHR client for JSON endpoints
 * https://www.npmjs.com/package/async-promise
 * @hidden
 */
export declare class XhrClient {
    sendRequestAsync(url: string, method: string, enableCaching?: boolean): Promise<XhrResponse>;
    protected handleError(responseText: string): any;
}
export declare type XhrResponse = {
    body: any;
    statusCode: number;
};
