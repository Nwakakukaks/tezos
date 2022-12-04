import { BeaconMessage, BeaconResponseInputMessage, AppMetadata } from '..';
import { PermissionManager } from '../managers/PermissionManager';
import { AppMetadataManager } from '../managers/AppMetadataManager';
import { BeaconRequestMessage } from '../types/beacon/BeaconRequestMessage';
interface OutgoingResponseInterceptorOptions {
    senderId: string;
    request: BeaconRequestMessage;
    message: BeaconResponseInputMessage;
    ownAppMetadata: AppMetadata;
    permissionManager: PermissionManager;
    appMetadataManager: AppMetadataManager;
    interceptorCallback(message: BeaconMessage): void;
}
/**
 * @internalapi
 *
 * The OutgoingResponseInterceptor is used in the WalletClient to intercept an outgoing response and enrich it with data.
 */
export declare class OutgoingResponseInterceptor {
    static intercept(config: OutgoingResponseInterceptorOptions): Promise<void>;
}
export {};
