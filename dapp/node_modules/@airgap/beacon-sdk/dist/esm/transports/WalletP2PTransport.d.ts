import * as sodium from 'libsodium-wrappers';
import { Storage, StorageKey, P2PTransport, P2PPairingRequest } from '..';
/**
 * @internalapi
 *
 *
 */
export declare class WalletP2PTransport extends P2PTransport<P2PPairingRequest, StorageKey.TRANSPORT_P2P_PEERS_WALLET> {
    constructor(name: string, keyPair: sodium.KeyPair, storage: Storage, matrixNodes: string[], iconUrl?: string, appUrl?: string);
    addPeer(newPeer: P2PPairingRequest, sendPairingResponse?: boolean): Promise<void>;
}
