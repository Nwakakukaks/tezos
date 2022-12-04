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
import { toHex, getHexHash, sealCryptobox } from '../../utils/crypto';
/**
 * @internalapi
 *
 *
 */
export class CommunicationClient {
    constructor(keyPair) {
        this.keyPair = keyPair;
    }
    /**
     * Get the public key
     */
    getPublicKey() {
        return __awaiter(this, void 0, void 0, function* () {
            return toHex(this.keyPair.publicKey);
        });
    }
    /**
     * get the public key hash
     */
    getPublicKeyHash() {
        return __awaiter(this, void 0, void 0, function* () {
            return getHexHash(this.keyPair.publicKey);
        });
    }
    /**
     * Create a cryptobox shared key
     *
     * @param otherPublicKey
     * @param selfPrivateKey
     */
    createCryptoBox(otherPublicKey, selfPrivateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Don't calculate it every time?
            const kxSelfPrivateKey = sodium.crypto_sign_ed25519_sk_to_curve25519(Buffer.from(selfPrivateKey)); // Secret bytes to scalar bytes
            const kxSelfPublicKey = sodium.crypto_sign_ed25519_pk_to_curve25519(Buffer.from(selfPrivateKey).slice(32, 64)); // Secret bytes to scalar bytes
            const kxOtherPublicKey = sodium.crypto_sign_ed25519_pk_to_curve25519(Buffer.from(otherPublicKey, 'hex')); // Secret bytes to scalar bytes
            return [
                Buffer.from(kxSelfPublicKey),
                Buffer.from(kxSelfPrivateKey),
                Buffer.from(kxOtherPublicKey)
            ];
        });
    }
    /**
     * Create a cryptobox server
     *
     * @param otherPublicKey
     * @param selfPrivateKey
     */
    createCryptoBoxServer(otherPublicKey, selfPrivateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = yield this.createCryptoBox(otherPublicKey, selfPrivateKey);
            return sodium.crypto_kx_server_session_keys(...keys);
        });
    }
    /**
     * Create a cryptobox client
     *
     * @param otherPublicKey
     * @param selfPrivateKey
     */
    createCryptoBoxClient(otherPublicKey, selfPrivateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = yield this.createCryptoBox(otherPublicKey, selfPrivateKey);
            return sodium.crypto_kx_client_session_keys(...keys);
        });
    }
    /**
     * Encrypt a message for a specific publicKey (receiver, asymmetric)
     *
     * @param recipientPublicKey
     * @param message
     */
    encryptMessageAsymmetric(recipientPublicKey, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return sealCryptobox(message, Buffer.from(recipientPublicKey, 'hex'));
        });
    }
}
//# sourceMappingURL=CommunicationClient.js.map