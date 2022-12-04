import * as sodium from 'libsodium-wrappers';
import { StorageKey, PostMessageTransport, Storage } from '..';
import { ExtendedPostMessagePairingResponse } from '../types/PostMessagePairingResponse';
/**
 * @internalapi
 *
 *
 */
export declare class DappPostMessageTransport extends PostMessageTransport<ExtendedPostMessagePairingResponse, StorageKey.TRANSPORT_POSTMESSAGE_PEERS_DAPP> {
    constructor(name: string, keyPair: sodium.KeyPair, storage: Storage);
    startOpenChannelListener(): Promise<void>;
    listenForNewPeer(newPeerListener: (peer: ExtendedPostMessagePairingResponse) => void): Promise<void>;
    stopListeningForNewPeers(): Promise<void>;
}
