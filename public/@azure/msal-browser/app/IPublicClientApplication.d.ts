import { AuthenticationResult, AccountInfo, Logger } from "@azure/msal-common";
import { RedirectRequest } from "../request/RedirectRequest";
import { PopupRequest } from "../request/PopupRequest";
import { SilentRequest } from "../request/SilentRequest";
import { SsoSilentRequest } from "../request/SsoSilentRequest";
import { EndSessionRequest } from "../request/EndSessionRequest";
import { WrapperSKU } from "../utils/BrowserConstants";
import { INavigationClient } from "../navigation/INavigationClient";
import { EndSessionPopupRequest } from "../request/EndSessionPopupRequest";
import { ITokenCache } from "../cache/ITokenCache";
export interface IPublicClientApplication {
    acquireTokenPopup(request: PopupRequest): Promise<AuthenticationResult>;
    acquireTokenRedirect(request: RedirectRequest): Promise<void>;
    acquireTokenSilent(silentRequest: SilentRequest): Promise<AuthenticationResult>;
    addEventCallback(callback: Function): string | null;
    removeEventCallback(callbackId: string): void;
    enableAccountStorageEvents(): void;
    disableAccountStorageEvents(): void;
    getAccountByHomeId(homeAccountId: string): AccountInfo | null;
    getAccountByLocalId(localId: string): AccountInfo | null;
    getAccountByUsername(userName: string): AccountInfo | null;
    getAllAccounts(): AccountInfo[];
    handleRedirectPromise(hash?: string): Promise<AuthenticationResult | null>;
    loginPopup(request?: PopupRequest): Promise<AuthenticationResult>;
    loginRedirect(request?: RedirectRequest): Promise<void>;
    logout(logoutRequest?: EndSessionRequest): Promise<void>;
    logoutRedirect(logoutRequest?: EndSessionRequest): Promise<void>;
    logoutPopup(logoutRequest?: EndSessionPopupRequest): Promise<void>;
    ssoSilent(request: SsoSilentRequest): Promise<AuthenticationResult>;
    getTokenCache(): ITokenCache;
    getLogger(): Logger;
    setLogger(logger: Logger): void;
    setActiveAccount(account: AccountInfo | null): void;
    getActiveAccount(): AccountInfo | null;
    initializeWrapperLibrary(sku: WrapperSKU, version: string): void;
    setNavigationClient(navigationClient: INavigationClient): void;
}
export declare const stubbedPublicClientApplication: IPublicClientApplication;
//# sourceMappingURL=IPublicClientApplication.d.ts.map