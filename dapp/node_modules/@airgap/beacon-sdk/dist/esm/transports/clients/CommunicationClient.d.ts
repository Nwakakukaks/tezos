import * as sodium from 'libsodium-wrappers';
import { P2PPairingRequest } from '../..';
import { ExtendedP2PPairingResponse } from '../../types/P2PPairingResponse';
import { PostMessagePairingRequest } from '../../types/PostMessagePairingRequest';
import { ExtendedPostMessagePairingResponse } from '../../types/PostMessagePairingResponse';
/**
 * @internalapi
 *
 *
 */
export declare abstract class CommunicationClient {
    protected readonly keyPair: sodium.KeyPair;
    constructor(keyPair: sodium.KeyPair);
    /**
     * Get the public key
     */
    getPublicKey(): Promise<string>;
    /**
     * get the public key hash
     */
    getPublicKeyHash(): Promise<string>;
    /**
     * Create a cryptobox shared key
     *
     * @param otherPublicKey
     * @param selfPrivateKey
     */
    protected createCryptoBox(otherPublicKey: string, selfPrivateKey: Uint8Array): Promise<[Uint8Array, Uint8Array, Uint8Array]>;
    /**
     * Create a cryptobox server
     *
     * @param otherPublicKey
     * @param selfPrivateKey
     */
    protected createCryptoBoxServer(otherPublicKey: string, selfPrivateKey: Uint8Array): Promise<sodium.CryptoKX>;
    /**
     * Create a cryptobox client
     *
     * @param otherPublicKey
     * @param selfPrivateKey
     */
    protected createCryptoBoxClient(otherPublicKey: string, selfPrivateKey: Uint8Array): Promise<sodium.CryptoKX>;
    /**
     * Encrypt a message for a specific publicKey (receiver, asymmetric)
     *
     * @param recipientPublicKey
     * @param message
     */
    protected encryptMessageAsymmetric(recipientPublicKey: string, message: string): Promise<string>;
    abstract unsubscribeFromEncryptedMessages(): Promise<void>;
    abstract unsubscribeFromEncryptedMessage(senderPublicKey: string): Promise<void>;
    abstract sendMessage(message: string, peer?: P2PPairingRequest | ExtendedP2PPairingResponse | PostMessagePairingRequest | ExtendedPostMessagePairingResponse): Promise<void>;
}
