import { AppMetadata, BeaconBaseMessage, BeaconMessageType, Network, PermissionScope, Threshold } from '../../..';
/**
 * @category Message
 */
export interface PermissionResponse extends BeaconBaseMessage {
    type: BeaconMessageType.PermissionResponse;
    appMetadata: AppMetadata;
    publicKey: string;
    network: Network;
    scopes: PermissionScope[];
    threshold?: Threshold;
}
