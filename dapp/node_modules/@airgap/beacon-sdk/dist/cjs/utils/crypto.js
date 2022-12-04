"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipientString = exports.getAddressFromPublicKey = exports.openCryptobox = exports.sealCryptobox = exports.decryptCryptoboxPayload = exports.encryptCryptoboxPayload = exports.getKeypairFromSeed = exports.getHexHash = exports.toHex = void 0;
var bs58check = __importStar(require("bs58check"));
var sodium = __importStar(require("libsodium-wrappers"));
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/**
 * Convert a value to hex
 *
 * @param value
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toHex(value) {
    return Buffer.from(value).toString('hex');
}
exports.toHex = toHex;
/**
 * Get the hex hash of a value
 *
 * @param key
 */
function getHexHash(key) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sodium.ready];
                case 1:
                    _a.sent();
                    return [2 /*return*/, toHex(sodium.crypto_generichash(32, key))];
            }
        });
    });
}
exports.getHexHash = getHexHash;
/**
 * Get a keypair from a seed
 *
 * @param seed
 */
function getKeypairFromSeed(seed) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sodium.ready];
                case 1:
                    _a.sent();
                    return [2 /*return*/, sodium.crypto_sign_seed_keypair(sodium.crypto_generichash(32, sodium.from_string(seed)))];
            }
        });
    });
}
exports.getKeypairFromSeed = getKeypairFromSeed;
/**
 * Encrypt a message with a shared key
 *
 * @param message
 * @param sharedKey
 */
function encryptCryptoboxPayload(message, sharedKey) {
    return __awaiter(this, void 0, void 0, function () {
        var nonce, combinedPayload;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sodium.ready];
                case 1:
                    _a.sent();
                    nonce = Buffer.from(sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES));
                    combinedPayload = Buffer.concat([
                        nonce,
                        Buffer.from(sodium.crypto_secretbox_easy(Buffer.from(message, 'utf8'), nonce, sharedKey))
                    ]);
                    return [2 /*return*/, toHex(combinedPayload)];
            }
        });
    });
}
exports.encryptCryptoboxPayload = encryptCryptoboxPayload;
/**
 * Decrypt a message with a shared key
 *
 * @param payload
 * @param sharedKey
 */
function decryptCryptoboxPayload(payload, sharedKey) {
    return __awaiter(this, void 0, void 0, function () {
        var nonce, ciphertext;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sodium.ready];
                case 1:
                    _a.sent();
                    nonce = payload.slice(0, sodium.crypto_secretbox_NONCEBYTES);
                    ciphertext = payload.slice(sodium.crypto_secretbox_NONCEBYTES);
                    return [2 /*return*/, Buffer.from(sodium.crypto_secretbox_open_easy(ciphertext, nonce, sharedKey)).toString('utf8')];
            }
        });
    });
}
exports.decryptCryptoboxPayload = decryptCryptoboxPayload;
/**
 * Encrypt a message with a public key
 *
 * @param payload
 * @param publicKey
 */
function sealCryptobox(payload, publicKey) {
    return __awaiter(this, void 0, void 0, function () {
        var kxSelfPublicKey, encryptedMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sodium.ready];
                case 1:
                    _a.sent();
                    kxSelfPublicKey = sodium.crypto_sign_ed25519_pk_to_curve25519(Buffer.from(publicKey)) // Secret bytes to scalar bytes
                    ;
                    encryptedMessage = sodium.crypto_box_seal(payload, kxSelfPublicKey);
                    return [2 /*return*/, toHex(encryptedMessage)];
            }
        });
    });
}
exports.sealCryptobox = sealCryptobox;
/**
 * Decrypt a message with public + private key
 *
 * @param encryptedPayload
 * @param publicKey
 * @param privateKey
 */
function openCryptobox(encryptedPayload, publicKey, privateKey) {
    return __awaiter(this, void 0, void 0, function () {
        var kxSelfPrivateKey, kxSelfPublicKey, decryptedMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sodium.ready];
                case 1:
                    _a.sent();
                    kxSelfPrivateKey = sodium.crypto_sign_ed25519_sk_to_curve25519(Buffer.from(privateKey)) // Secret bytes to scalar bytes
                    ;
                    kxSelfPublicKey = sodium.crypto_sign_ed25519_pk_to_curve25519(Buffer.from(publicKey)) // Secret bytes to scalar bytes
                    ;
                    decryptedMessage = sodium.crypto_box_seal_open(encryptedPayload, kxSelfPublicKey, kxSelfPrivateKey);
                    return [2 /*return*/, Buffer.from(decryptedMessage).toString()];
            }
        });
    });
}
exports.openCryptobox = openCryptobox;
/**
 * Get an address from the public key
 *
 * @param publicKey
 */
function getAddressFromPublicKey(publicKey) {
    return __awaiter(this, void 0, void 0, function () {
        var prefixes, prefix, plainPublicKey, entries, index, _a, key, value, decoded, payload;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, sodium.ready];
                case 1:
                    _b.sent();
                    prefixes = {
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
                    if (publicKey.length === 64) {
                        prefix = prefixes.edpk.prefix;
                        plainPublicKey = publicKey;
                    }
                    else {
                        entries = Object.entries(prefixes);
                        for (index = 0; index < entries.length; index++) {
                            _a = entries[index], key = _a[0], value = _a[1];
                            if (publicKey.startsWith(key) && publicKey.length === value.length) {
                                prefix = value.prefix;
                                decoded = bs58check.decode(publicKey);
                                plainPublicKey = decoded.slice(key.length, decoded.length).toString('hex');
                                break;
                            }
                        }
                    }
                    if (!prefix || !plainPublicKey) {
                        throw new Error("invalid publicKey: " + publicKey);
                    }
                    payload = sodium.crypto_generichash(20, Buffer.from(plainPublicKey, 'hex'));
                    return [2 /*return*/, bs58check.encode(Buffer.concat([prefix, Buffer.from(payload)]))];
            }
        });
    });
}
exports.getAddressFromPublicKey = getAddressFromPublicKey;
/**
 * Get the recipient string used in the matrix message
 *
 * @param recipientHash
 * @param relayServer
 */
function recipientString(recipientHash, relayServer) {
    return "@" + recipientHash + ":" + relayServer;
}
exports.recipientString = recipientString;
/* eslint-enable prefer-arrow/prefer-arrow-functions */
//# sourceMappingURL=crypto.js.map