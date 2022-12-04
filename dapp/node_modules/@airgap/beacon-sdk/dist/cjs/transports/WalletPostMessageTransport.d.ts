import * as sodium from 'libsodium-wrappers';
import { StorageKey, PostMessageTransport, Storage } from '..';
import { PostMessagePairingRequest } from '../types/PostMessagePairingRequest';
/**
 * @internalapi
 *
 *
 */
export declare class WalletPostMessageTransport extends PostMessageTransport<PostMessagePairingRequest, StorageKey.TRANSPORT_POSTMESSAGE_PEERS_WALLET> {
    constructor(name: string, keyPair: sodium.KeyPair, storage: Storage);
}
