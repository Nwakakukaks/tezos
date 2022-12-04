import { ConnectionContext } from '../..';
import { ExtendedPostMessagePairingResponse } from '../../types/PostMessagePairingResponse';
import { EncryptedExtensionMessage } from '../../types/ExtensionMessage';
import { PostMessagePairingRequest } from '../../types/PostMessagePairingRequest';
import { MessageBasedClient } from './MessageBasedClient';
/**
 * @internalapi
 *
 *
 */
export declare class PostMessageClient extends MessageBasedClient {
    protected readonly activeListeners: Map<string, (message: EncryptedExtensionMessage, context: ConnectionContext) => void>;
    init(): Promise<void>;
    listenForEncryptedMessage(senderPublicKey: string, messageCallback: (message: string, context: ConnectionContext) => void): Promise<void>;
    sendMessage(message: string, peer: PostMessagePairingRequest | ExtendedPostMessagePairingResponse): Promise<void>;
    listenForChannelOpening(messageCallback: (pairingResponse: ExtendedPostMessagePairingResponse) => void): Promise<void>;
    sendPairingRequest(id: string): Promise<void>;
    isChannelOpenMessage(message: any): Promise<boolean>;
    private subscribeToMessages;
}
