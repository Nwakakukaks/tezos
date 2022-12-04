import * as sodium from 'libsodium-wrappers';
import { Storage, StorageKey, Transport, TransportType, P2PCommunicationClient, P2PPairingRequest } from '..';
import { ExtendedP2PPairingResponse } from '../types/P2PPairingResponse';
/**
 * @internalapi
 *
 *
 */
export declare class P2PTransport<T extends P2PPairingRequest | ExtendedP2PPairingResponse, K extends StorageKey.TRANSPORT_P2P_PEERS_DAPP | StorageKey.TRANSPORT_P2P_PEERS_WALLET> extends Transport<T, K, P2PCommunicationClient> {
    readonly type: TransportType;
    constructor(name: string, keyPair: sodium.KeyPair, storage: Storage, matrixNodes: string[], storageKey: K, iconUrl?: string, appUrl?: string);
    static isAvailable(): Promise<boolean>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    startOpenChannelListener(): Promise<void>;
    getPairingRequestInfo(): Promise<P2PPairingRequest>;
    listen(publicKey: string): Promise<void>;
}
