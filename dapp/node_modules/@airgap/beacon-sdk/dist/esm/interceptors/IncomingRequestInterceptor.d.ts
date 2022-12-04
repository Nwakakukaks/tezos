import { BeaconRequestOutputMessage } from '..';
import { ConnectionContext } from '../types/ConnectionContext';
import { AppMetadataManager } from '../managers/AppMetadataManager';
import { BeaconRequestMessage } from '../types/beacon/BeaconRequestMessage';
interface IncomingRequestInterceptorOptions {
    message: BeaconRequestMessage;
    connectionInfo: ConnectionContext;
    appMetadataManager: AppMetadataManager;
    interceptorCallback(message: BeaconRequestOutputMessage, connectionInfo: ConnectionContext): void;
}
/**
 * @internalapi
 *
 * The IncomingRequestInterceptor is used in the WalletClient to intercept an incoming request and enrich it with data, like app metadata.
 */
export declare class IncomingRequestInterceptor {
    /**
     * The method that is called during the interception
     *
     * @param config
     */
    static intercept(config: IncomingRequestInterceptorOptions): Promise<void>;
    private static getAppMetadata;
}
export {};
