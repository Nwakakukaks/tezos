import { BeaconMessageType } from '../..';
/**
 * @category Message
 */
export interface BeaconBaseMessage {
    type: BeaconMessageType;
    version: string;
    id: string;
    senderId: string;
}
