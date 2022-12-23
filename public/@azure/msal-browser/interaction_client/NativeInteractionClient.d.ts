import { AuthenticationResult, Logger, ICrypto, IPerformanceClient } from "@azure/msal-common";
import { BaseInteractionClient } from "./BaseInteractionClient";
import { BrowserConfiguration } from "../config/Configuration";
import { BrowserCacheManager } from "../cache/BrowserCacheManager";
import { EventHandler } from "../event/EventHandler";
import { PopupRequest } from "../request/PopupRequest";
import { SilentRequest } from "../request/SilentRequest";
import { SsoSilentRequest } from "../request/SsoSilentRequest";
import { NativeMessageHandler } from "../broker/nativeBroker/NativeMessageHandler";
import { ApiId } from "../utils/BrowserConstants";
import { NativeTokenRequest } from "../broker/nativeBroker/NativeRequest";
import { NativeResponse } from "../broker/nativeBroker/NativeResponse";
import { RedirectRequest } from "../request/RedirectRequest";
import { INavigationClient } from "../navigation/INavigationClient";
import { SilentCacheClient } from "./SilentCacheClient";
export declare class NativeInteractionClient extends BaseInteractionClient {
    protected apiId: ApiId;
    protected accountId: string;
    protected nativeMessageHandler: NativeMessageHandler;
    protected silentCacheClient: SilentCacheClient;
    protected nativeStorageManager: BrowserCacheManager;
    constructor(config: BrowserConfiguration, browserStorage: BrowserCacheManager, browserCrypto: ICrypto, logger: Logger, eventHandler: EventHandler, navigationClient: INavigationClient, apiId: ApiId, performanceClient: IPerformanceClient, provider: NativeMessageHandler, accountId: string, nativeStorageImpl: BrowserCacheManager, correlationId?: string);
    /**
     * Acquire token from native platform via browser extension
     * @param request
     */
    acquireToken(request: PopupRequest | SilentRequest | SsoSilentRequest): Promise<AuthenticationResult>;
    /**
     * Creates silent flow request
     * @param request
     * @param cachedAccount
     * @returns CommonSilentFlowRequest
     */
    private createSilentCacheRequest;
    /**
     * Fetches the tokens from the cache if un-expired
     * @param nativeAccountId
     * @param request
     * @returns authenticationResult
     */
    protected acquireTokensFromCache(nativeAccountId: string, request: NativeTokenRequest): Promise<AuthenticationResult>;
    /**
     * Acquires a token from native platform then redirects to the redirectUri instead of returning the response
     * @param request
     */
    acquireTokenRedirect(request: RedirectRequest): Promise<void>;
    /**
     * If the previous page called native platform for a token using redirect APIs, send the same request again and return the response
     */
    handleRedirectPromise(): Promise<AuthenticationResult | null>;
    /**
     * Logout from native platform via browser extension
     * @param request
     */
    logout(): Promise<void>;
    /**
     * Transform response from native platform into AuthenticationResult object which will be returned to the end user
     * @param response
     * @param request
     * @param reqTimestamp
     */
    protected handleNativeResponse(response: NativeResponse, request: NativeTokenRequest, reqTimestamp: number): Promise<AuthenticationResult>;
    /**
     * Validates native platform response before processing
     * @param response
     */
    private validateNativeResponse;
    /**
     * Gets MATS telemetry from native response
     * @param response
     * @returns
     */
    private getMATSFromResponse;
    /**
     * Returns whether or not response came from native cache
     * @param response
     * @returns
     */
    private isResponseFromCache;
    /**
     * Translates developer provided request object into NativeRequest object
     * @param request
     */
    protected initializeNativeRequest(request: PopupRequest | SsoSilentRequest): Promise<NativeTokenRequest>;
}
//# sourceMappingURL=NativeInteractionClient.d.ts.map