import * as sodium from 'libsodium-wrappers';
import { PostMessagePairingRequest } from '../../types/PostMessagePairingRequest';
import { PostMessagePairingResponse } from '../../types/PostMessagePairingResponse';
import { CommunicationClient } from './CommunicationClient';
/**
 * @internalapi
 *
 *
 */
export declare abstract class MessageBasedClient extends CommunicationClient {
    protected readonly name: string;
    /**
     * The listeners that will be notified of new messages
     */
    protected abstract readonly activeListeners: Map<string, unknown>;
    constructor(name: string, keyPair: sodium.KeyPair);
    /**
     * start the client and make sure all dependencies are ready
     */
    start(): Promise<void>;
    /**
     * Get the pairing request information. This will be shared with the peer during the connection setup
     */
    getPairingRequestInfo(): Promise<PostMessagePairingRequest>;
    /**
     * Get the pairing response information. This will be shared with the peer during the connection setup
     */
    getPairingResponseInfo(request: PostMessagePairingRequest): Promise<PostMessagePairingResponse>;
    /**
     * Unsubscribe from encrypted messages from a specific peer
     *
     * @param senderPublicKey
     */
    unsubscribeFromEncryptedMessage(senderPublicKey: string): Promise<void>;
    /**
     * Unsubscribe from all encrypted messages
     */
    unsubscribeFromEncryptedMessages(): Promise<void>;
    /**
     * Decrypt a message from a specific peer
     *
     * @param senderPublicKey
     * @param payload
     */
    protected decryptMessage(senderPublicKey: string, payload: string): Promise<string>;
    /**
     * Encrypt a message for a specific publicKey (receiver)
     *
     * @param recipientPublicKey
     * @param message
     */
    protected encryptMessage(recipientPublicKey: string, message: string): Promise<string>;
    /**
     * Initialize the connection
     */
    abstract init(): Promise<void>;
}
