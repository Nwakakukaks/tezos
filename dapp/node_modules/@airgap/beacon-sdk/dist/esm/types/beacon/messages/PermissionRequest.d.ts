import { BeaconBaseMessage, BeaconMessageType, PermissionScope, AppMetadata, Network } from '../../..';
/**
 * @category Message
 */
export interface PermissionRequest extends BeaconBaseMessage {
    type: BeaconMessageType.PermissionRequest;
    appMetadata: AppMetadata;
    network: Network;
    scopes: PermissionScope[];
}
