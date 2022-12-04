import { BeaconEvent } from './events';
import { BeaconMessageType } from '.';
export declare const messageEvents: {
    [key in BeaconMessageType]: {
        sent: BeaconEvent;
        success: BeaconEvent;
        error: BeaconEvent;
    };
};
