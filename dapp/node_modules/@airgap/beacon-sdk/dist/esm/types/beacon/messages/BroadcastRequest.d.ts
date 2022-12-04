import { BeaconBaseMessage, BeaconMessageType, Network } from '../../..';
/**
 * @category Message
 */
export interface BroadcastRequest extends BeaconBaseMessage {
    type: BeaconMessageType.BroadcastRequest;
    network: Network;
    signedTransaction: string;
}
