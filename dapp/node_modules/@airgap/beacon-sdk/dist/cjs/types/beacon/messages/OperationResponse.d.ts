import { BeaconBaseMessage, BeaconMessageType } from '../../..';
/**
 * @category Message
 */
export interface OperationResponse extends BeaconBaseMessage {
    type: BeaconMessageType.OperationResponse;
    transactionHash: string;
}
