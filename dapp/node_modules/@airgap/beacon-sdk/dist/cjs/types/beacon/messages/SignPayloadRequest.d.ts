import { BeaconBaseMessage, BeaconMessageType, SigningType } from '../../..';
/**
 * @category Message
 */
export interface SignPayloadRequest extends BeaconBaseMessage {
    type: BeaconMessageType.SignPayloadRequest;
    signingType: SigningType;
    payload: string;
    sourceAddress: string;
}
