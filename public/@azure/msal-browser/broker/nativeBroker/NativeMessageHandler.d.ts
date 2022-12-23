import { Logger, AuthenticationScheme } from "@azure/msal-common";
import { NativeExtensionRequestBody } from "./NativeRequest";
import { BrowserConfiguration } from "../../config/Configuration";
export declare class NativeMessageHandler {
    private extensionId;
    private extensionVersion;
    private logger;
    private handshakeTimeoutMs;
    private responseId;
    private timeoutId;
    private resolvers;
    private handshakeResolvers;
    private messageChannel;
    private windowListener;
    constructor(logger: Logger, handshakeTimeoutMs: number, extensionId?: string);
    /**
     * Sends a given message to the extension and resolves with the extension response
     * @param body
     */
    sendMessage(body: NativeExtensionRequestBody): Promise<object>;
    /**
     * Returns an instance of the MessageHandler that has successfully established a connection with an extension
     * @param logger
     * @param handshakeTimeoutMs
     */
    static createProvider(logger: Logger, handshakeTimeoutMs: number): Promise<NativeMessageHandler>;
    /**
     * Send handshake request helper.
     */
    private sendHandshakeRequest;
    /**
     * Invoked when a message is posted to the window. If a handshake request is received it means the extension is not installed.
     * @param event
     */
    private onWindowMessage;
    /**
     * Invoked when a message is received from the extension on the MessageChannel port
     * @param event
     */
    private onChannelMessage;
    /**
     * Returns the Id for the browser extension this handler is communicating with
     * @returns
     */
    getExtensionId(): string | undefined;
    /**
     * Returns the version for the browser extension this handler is communicating with
     * @returns
     */
    getExtensionVersion(): string | undefined;
    /**
     * Returns boolean indicating whether or not the request should attempt to use native broker
     * @param logger
     * @param config
     * @param nativeExtensionProvider
     * @param authenticationScheme
     */
    static isNativeAvailable(config: BrowserConfiguration, logger: Logger, nativeExtensionProvider?: NativeMessageHandler, authenticationScheme?: AuthenticationScheme): boolean;
}
//# sourceMappingURL=NativeMessageHandler.d.ts.map