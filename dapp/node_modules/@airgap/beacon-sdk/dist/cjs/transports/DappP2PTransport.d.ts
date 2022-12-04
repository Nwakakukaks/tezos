import * as sodium from 'libsodium-wrappers';
import { Storage, StorageKey, P2PTransport } from '..';
import { ExtendedP2PPairingResponse } from '../types/P2PPairingResponse';
/**
 * @internalapi
 *
 *
 */
export declare class DappP2PTransport extends P2PTransport<ExtendedP2PPairingResponse, StorageKey.TRANSPORT_P2P_PEERS_DAPP> {
    constructor(name: string, keyPair: sodium.KeyPair, storage: Storage, matrixNodes: string[], iconUrl?: string, appUrl?: string);
    startOpenChannelListener(): Promise<void>;
    listenForNewPeer(newPeerListener: (peer: ExtendedP2PPairingResponse) => void): Promise<void>;
    stopListeningForNewPeers(): Promise<void>;
}
