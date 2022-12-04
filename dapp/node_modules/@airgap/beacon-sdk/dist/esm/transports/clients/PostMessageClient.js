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
import { windowRef } from '../../MockWindow';
import { ExtensionMessageTarget, Origin, Serializer } from '../..';
import { openCryptobox } from '../../utils/crypto';
import { getSenderId } from '../../utils/get-sender-id';
import { MessageBasedClient } from './MessageBasedClient';
/**
 * @internalapi
 *
 *
 */
export class PostMessageClient extends MessageBasedClient {
    constructor() {
        super(...arguments);
        this.activeListeners = new Map();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.subscribeToMessages().catch(console.error);
        });
    }
    listenForEncryptedMessage(senderPublicKey, messageCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.activeListeners.has(senderPublicKey)) {
                return;
            }
            const callbackFunction = (message, context) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const decryptedMessage = yield this.decryptMessage(senderPublicKey, message.encryptedPayload);
                    // console.log('calculated sender ID', await getSenderId(senderPublicKey))
                    // TODO: Add check for correct decryption key / sender ID
                    messageCallback(decryptedMessage, context);
                }
                catch (decryptionError) {
                    /* NO-OP. We try to decode every message, but some might not be addressed to us. */
                }
            });
            this.activeListeners.set(senderPublicKey, callbackFunction);
        });
    }
    sendMessage(message, peer) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const payload = yield this.encryptMessage(peer.publicKey, message);
            const targetId = (_a = peer) === null || _a === void 0 ? void 0 : _a.extensionId;
            // if no targetId, we remove peer
            const msg = {
                target: ExtensionMessageTarget.EXTENSION,
                encryptedPayload: payload,
                targetId
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            windowRef.postMessage(msg, windowRef.location.origin);
        });
    }
    listenForChannelOpening(messageCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const fn = (event) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const data = (_a = event === null || event === void 0 ? void 0 : event.data) === null || _a === void 0 ? void 0 : _a.message;
                if (data &&
                    data.target === ExtensionMessageTarget.PAGE &&
                    (yield this.isChannelOpenMessage(data))) {
                    const payload = Buffer.from(data.payload, 'hex');
                    if (payload.length >=
                        sodium.crypto_secretbox_NONCEBYTES + sodium.crypto_secretbox_MACBYTES) {
                        try {
                            const pairingResponse = JSON.parse(yield openCryptobox(payload, this.keyPair.publicKey, this.keyPair.privateKey));
                            messageCallback(Object.assign(Object.assign({}, pairingResponse), { senderId: yield getSenderId(pairingResponse.publicKey), extensionId: (_b = event === null || event === void 0 ? void 0 : event.data) === null || _b === void 0 ? void 0 : _b.sender.id }));
                        }
                        catch (decryptionError) {
                            /* NO-OP. We try to decode every message, but some might not be addressed to us. */
                        }
                    }
                }
            });
            windowRef.addEventListener('message', fn);
        });
    }
    sendPairingRequest(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = {
                target: ExtensionMessageTarget.EXTENSION,
                payload: yield new Serializer().serialize(yield this.getPairingRequestInfo()),
                targetId: id
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            windowRef.postMessage(message, windowRef.location.origin);
        });
    }
    isChannelOpenMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return typeof message === 'object' && message.hasOwnProperty('payload');
        });
    }
    subscribeToMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            windowRef.addEventListener('message', (message) => {
                if (typeof message === 'object' && message) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const data = message.data;
                    if (data.message && data.message.target === ExtensionMessageTarget.PAGE) {
                        this.activeListeners.forEach((listener) => {
                            listener(data.message, {
                                origin: Origin.EXTENSION,
                                id: data.sender.id || ''
                            });
                        });
                    }
                }
            });
        });
    }
}
//# sourceMappingURL=PostMessageClient.js.map