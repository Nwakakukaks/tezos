var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as bs58check from 'bs58check';
import * as sodium from 'libsodium-wrappers';
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/**
 * Convert a value to hex
 *
 * @param value
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toHex(value) {
    return Buffer.from(value).toString('hex');
}
/**
 * Get the hex hash of a value
 *
 * @param key
 */
export function getHexHash(key) {
    return __awaiter(this, void 0, void 0, function* () {
        yield sodium.ready;
        return toHex(sodium.crypto_generichash(32, key));
    });
}
/**
 * Get a keypair from a seed
 *
 * @param seed
 */
export function getKeypairFromSeed(seed) {
    return __awaiter(this, void 0, void 0, function* () {
        yield sodium.ready;
        return sodium.crypto_sign_seed_keypair(sodium.crypto_generichash(32, sodium.from_string(seed)));
    });
}
/**
 * Encrypt a message with a shared key
 *
 * @param message
 * @param sharedKey
 */
export function encryptCryptoboxPayload(message, sharedKey) {
    return __awaiter(this, void 0, void 0, function* () {
        yield sodium.ready;
        const nonce = Buffer.from(sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES));
        const combinedPayload = Buffer.concat([
            nonce,
            Buffer.from(sodium.crypto_secretbox_easy(Buffer.from(message, 'utf8'), nonce, sharedKey))
        ]);
        return toHex(combinedPayload);
    });
}
/**
 * Decrypt a message with a shared key
 *
 * @param payload
 * @param sharedKey
 */
export function decryptCryptoboxPayload(payload, sharedKey) {
    return __awaiter(this, void 0, void 0, function* () {
        yield sodium.ready;
        const nonce = payload.slice(0, sodium.crypto_secretbox_NONCEBYTES);
        const ciphertext = payload.slice(sodium.crypto_secretbox_NONCEBYTES);
        return Buffer.from(sodium.crypto_secretbox_open_easy(ciphertext, nonce, sharedKey)).toString('utf8');
    });
}
/**
 * Encrypt a message with a public key
 *
 * @param payload
 * @param publicKey
 */
export function sealCryptobox(payload, publicKey) {
    return __awaiter(this, void 0, void 0, function* () {
        yield sodium.ready;
        const kxSelfPublicKey = sodium.crypto_sign_ed25519_pk_to_curve25519(Buffer.from(publicKey)); // Secret bytes to scalar bytes
        const encryptedMessage = sodium.crypto_box_seal(payload, kxSelfPublicKey);
        return toHex(encryptedMessage);
    });
}
/**
 * Decrypt a message with public + private key
 *
 * @param encryptedPayload
 * @param publicKey
 * @param privateKey
 */
export function openCryptobox(encryptedPayload, publicKey, privateKey) {
    return __awaiter(this, void 0, void 0, function* () {
        yield sodium.ready;
        const kxSelfPrivateKey = sodium.crypto_sign_ed25519_sk_to_curve25519(Buffer.from(privateKey)); // Secret bytes to scalar bytes
        const kxSelfPublicKey = sodium.crypto_sign_ed25519_pk_to_curve25519(Buffer.from(publicKey)); // Secret bytes to scalar bytes
        const decryptedMessage = sodium.crypto_box_seal_open(encryptedPayload, kxSelfPublicKey, kxSelfPrivateKey);
        return Buffer.from(decryptedMessage).toString();
    });
}
/**
 * Get an address from the public key
 *
 * @param publicKey
 */
export function getAddressFromPublicKey(publicKey) {
    return __awaiter(this, void 0, void 0, function* () {
        yield sodium.ready;
        const prefixes = {
            // tz1...
            edpk: {
                length: 54,
                prefix: Buffer.from(new Uint8Array([6, 161, 159]))
            },
            // tz2...
            sppk: {
                length: 55,
                prefix: Buffer.from(new Uint8Array([6, 161, 161]))
            },
            // tz3...
            p2pk: {
                length: 55,
                prefix: Buffer.from(new Uint8Array([6, 161, 164]))
            }
        };
        let prefix;
        let plainPublicKey;
        if (publicKey.length === 64) {
            prefix = prefixes.edpk.prefix;
            plainPublicKey = publicKey;
        }
        else {
            const entries = Object.entries(prefixes);
            for (let index = 0; index < entries.length; index++) {
                const [key, value] = entries[index];
                if (publicKey.startsWith(key) && publicKey.length === value.length) {
                    prefix = value.prefix;
                    const decoded = bs58check.decode(publicKey);
                    plainPublicKey = decoded.slice(key.length, decoded.length).toString('hex');
                    break;
                }
            }
        }
        if (!prefix || !plainPublicKey) {
            throw new Error(`invalid publicKey: ${publicKey}`);
        }
        const payload = sodium.crypto_generichash(20, Buffer.from(plainPublicKey, 'hex'));
        return bs58check.encode(Buffer.concat([prefix, Buffer.from(payload)]));
    });
}
/**
 * Get the recipient string used in the matrix message
 *
 * @param recipientHash
 * @param relayServer
 */
export function recipientString(recipientHash, relayServer) {
    return `@${recipientHash}:${relayServer}`;
}
/* eslint-enable prefer-arrow/prefer-arrow-functions */
//# sourceMappingURL=crypto.js.map