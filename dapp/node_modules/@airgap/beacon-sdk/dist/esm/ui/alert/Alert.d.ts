import { NetworkType, P2PPairingRequest, PostMessagePairingRequest } from '../..';
export interface AlertButton {
    text: string;
    style?: 'solid' | 'outline';
    actionCallback?(): Promise<void>;
}
export interface AlertConfig {
    title: string;
    body?: string;
    timer?: number;
    buttons?: AlertButton[];
    pairingPayload?: {
        p2pSyncCode: () => Promise<P2PPairingRequest>;
        postmessageSyncCode: () => Promise<PostMessagePairingRequest>;
        preferredNetwork: NetworkType;
    };
    closeButtonCallback?(): void;
    disclaimerText?: string;
}
/**
 * Close an alert by ID
 *
 * @param id ID of alert
 */
declare const closeAlert: (id: string) => Promise<void>;
/**
 * Close all alerts
 */
declare const closeAlerts: () => Promise<void>;
/**
 * Show an alert
 *
 * @param alertConfig The configuration of the alert
 */
declare const openAlert: (alertConfig: AlertConfig) => Promise<string>;
export { closeAlert, closeAlerts, openAlert };
