/**
 * @packageDocumentation
 * @module @azure/msal-browser
 */
import * as BrowserUtils from "./utils/BrowserUtils";
export { BrowserUtils };
export { PublicClientApplication, createNestablePublicClientApplication, createStandardPublicClientApplication, } from "./app/PublicClientApplication";
export { PublicClientNext } from "./app/PublicClientNext";
export { IController } from "./controllers/IController";
export { Configuration, BrowserAuthOptions, CacheOptions, BrowserSystemOptions, BrowserTelemetryOptions, BrowserConfiguration, DEFAULT_IFRAME_TIMEOUT_MS, } from "./config/Configuration";
export { InteractionType, InteractionStatus, BrowserCacheLocation, WrapperSKU, ApiId, CacheLookupPolicy, } from "./utils/BrowserConstants";
export { BrowserAuthError, BrowserAuthErrorMessage, BrowserAuthErrorCodes, } from "./error/BrowserAuthError";
export { BrowserConfigurationAuthError, BrowserConfigurationAuthErrorCodes, BrowserConfigurationAuthErrorMessage, } from "./error/BrowserConfigurationAuthError";
export { IPublicClientApplication, stubbedPublicClientApplication, } from "./app/IPublicClientApplication";
export { INavigationClient } from "./navigation/INavigationClient";
export { NavigationClient } from "./navigation/NavigationClient";
export { NavigationOptions } from "./navigation/NavigationOptions";
export { PopupRequest } from "./request/PopupRequest";
export { RedirectRequest } from "./request/RedirectRequest";
export { SilentRequest } from "./request/SilentRequest";
export { SsoSilentRequest } from "./request/SsoSilentRequest";
export { EndSessionRequest } from "./request/EndSessionRequest";
export { EndSessionPopupRequest } from "./request/EndSessionPopupRequest";
export { AuthorizationUrlRequest } from "./request/AuthorizationUrlRequest";
export { AuthorizationCodeRequest } from "./request/AuthorizationCodeRequest";
export { AuthenticationResult } from "./response/AuthenticationResult";
export { ClearCacheRequest } from "./request/ClearCacheRequest";
export { InitializeApplicationRequest } from "./request/InitializeApplicationRequest";
export { LoadTokenOptions } from "./cache/TokenCache";
export { ITokenCache } from "./cache/ITokenCache";
export { MemoryStorage } from "./cache/MemoryStorage";
export { BrowserStorage } from "./cache/BrowserStorage";
export { EventMessage, EventPayload, EventError, EventCallbackFunction, EventMessageUtils, PopupEvent, } from "./event/EventMessage";
export { EventType } from "./event/EventType";
export { SignedHttpRequest, SignedHttpRequestOptions, } from "./crypto/SignedHttpRequest";
export { PopupWindowAttributes, PopupSize, PopupPosition, } from "./request/PopupWindowAttributes";
export { BrowserPerformanceClient } from "./telemetry/BrowserPerformanceClient";
export { BrowserPerformanceMeasurement } from "./telemetry/BrowserPerformanceMeasurement";
export { AuthenticationScheme, AccountInfo, AccountEntity, IdTokenClaims, AuthError, AuthErrorCodes, AuthErrorMessage, ClientAuthError, ClientAuthErrorCodes, ClientAuthErrorMessage, ClientConfigurationError, ClientConfigurationErrorCodes, ClientConfigurationErrorMessage, InteractionRequiredAuthError, InteractionRequiredAuthErrorCodes, InteractionRequiredAuthErrorMessage, ServerError, INetworkModule, NetworkResponse, NetworkRequestOptions, ILoggerCallback, Logger, LogLevel, ProtocolMode, ServerResponseType, PromptValue, ExternalTokenResponse, StringUtils, UrlString, JsonWebTokenTypes, AzureCloudInstance, AzureCloudOptions, AuthenticationHeaderParser, OIDC_DEFAULT_SCOPES, PerformanceCallbackFunction, PerformanceEvent, PerformanceEvents, InProgressPerformanceEvent, TenantProfile, IPerformanceClient, StubPerformanceClient, } from "@azure/msal-common";
export { version } from "./packageMetadata";
//# sourceMappingURL=index.d.ts.map