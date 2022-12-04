var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as sodium from 'libsodium-wrappers';
import { BEACON_VERSION } from '../../constants';
import { decryptCryptoboxPayload, encryptCryptoboxPayload } from '../../utils/crypto';
import { generateGUID } from '../../utils/generate-uuid';
import { CommunicationClient } from './CommunicationClient';
/**
 * @internalapi
 *
 *
 */
export class MessageBasedClient extends CommunicationClient {
    constructor(name, keyPair) {
        super(keyPair);
        this.name = name;
        /**
         * The listeners that will be notified of new messages
         */
        this.activeListeners = new Map();
        this.init().catch(console.error);
    }
    /**
     * start the client and make sure all dependencies are ready
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield sodium.ready;
        });
    }
    /**
     * Get the pairing request information. This will be shared with the peer during the connection setup
     */
    getPairingRequestInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                id: yield generateGUID(),
                type: 'postmessage-pairing-request',
                name: this.name,
                version: BEACON_VERSION,
                publicKey: yield this.getPublicKey()
            };
        });
    }
    /**
     * Get the pairing response information. This will be shared with the peer during the connection setup
     */
    getPairingResponseInfo(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                id: request.id,
                type: 'postmessage-pairing-response',
                name: this.name,
                version: BEACON_VERSION,
                publicKey: yield this.getPublicKey()
            };
        });
    }
    /**
     * Unsubscribe from encrypted messages from a specific peer
     *
     * @param senderPublicKey
     */
    unsubscribeFromEncryptedMessage(senderPublicKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const listener = this.activeListeners.get(senderPublicKey);
            if (!listener) {
                return;
            }
            this.activeListeners.delete(senderPublicKey);
        });
    }
    /**
     * Unsubscribe from all encrypted messages
     */
    unsubscribeFromEncryptedMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            this.activeListeners.clear();
        });
    }
    /**
     * Decrypt a message from a specific peer
     *
     * @param senderPublicKey
     * @param payload
     */
    decryptMessage(senderPublicKey, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sharedRx } = yield this.createCryptoBoxServer(senderPublicKey, this.keyPair.privateKey);
            const hexPayload = Buffer.from(payload, 'hex');
            if (hexPayload.length >=
                sodium.crypto_secretbox_NONCEBYTES + sodium.crypto_secretbox_MACBYTES) {
                try {
                    return yield decryptCryptoboxPayload(hexPayload, sharedRx);
                }
                catch (decryptionError) {
                    /* NO-OP. We try to decode every message, but some might not be addressed to us. */
                }
            }
            throw new Error('Could not decrypt message');
        });
    }
    /**
     * Encrypt a message for a specific publicKey (receiver)
     *
     * @param recipientPublicKey
     * @param message
     */
    encryptMessage(recipientPublicKey, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sharedTx } = yield this.createCryptoBoxClient(recipientPublicKey, this.keyPair.privateKey);
            return encryptCryptoboxPayload(message, sharedTx);
        });
    }
}
//# sourceMappingURL=MessageBasedClient.js.map