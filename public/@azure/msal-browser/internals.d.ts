/**
 * Warning: This set of exports is purely intended to be used by other MSAL libraries, and should be considered potentially unstable. We strongly discourage using them directly, you do so at your own risk.
 * Breaking changes to these APIs will be shipped under a minor version, instead of a major version.
 */
export { BrowserCacheManager } from "./cache/BrowserCacheManager";
export { StandardInteractionClient } from "./interaction_client/StandardInteractionClient";
export { RedirectClient } from "./interaction_client/RedirectClient";
export { PopupClient } from "./interaction_client/PopupClient";
export { SilentIframeClient } from "./interaction_client/SilentIframeClient";
export { SilentCacheClient } from "./interaction_client/SilentCacheClient";
export { SilentRefreshClient } from "./interaction_client/SilentRefreshClient";
export { RedirectHandler } from "./interaction_handler/RedirectHandler";
export { EventHandler } from "./event/EventHandler";
export { NativeMessageHandler } from "./broker/nativeBroker/NativeMessageHandler";
export { BrowserStateObject } from "./utils/BrowserProtocolUtils";
export { BrowserConstants, TemporaryCacheKeys } from "./utils/BrowserConstants";
export { CryptoOps } from "./crypto/CryptoOps";
export { NativeAuthError } from "./error/NativeAuthError";
//# sourceMappingURL=internals.d.ts.map