"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.MessageBasedClient = void 0;
var sodium = __importStar(require("libsodium-wrappers"));
var constants_1 = require("../../constants");
var crypto_1 = require("../../utils/crypto");
var generate_uuid_1 = require("../../utils/generate-uuid");
var CommunicationClient_1 = require("./CommunicationClient");
/**
 * @internalapi
 *
 *
 */
var MessageBasedClient = /** @class */ (function (_super) {
    __extends(MessageBasedClient, _super);
    function MessageBasedClient(name, keyPair) {
        var _this = _super.call(this, keyPair) || this;
        _this.name = name;
        /**
         * The listeners that will be notified of new messages
         */
        _this.activeListeners = new Map();
        _this.init().catch(console.error);
        return _this;
    }
    /**
     * start the client and make sure all dependencies are ready
     */
    MessageBasedClient.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sodium.ready];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get the pairing request information. This will be shared with the peer during the connection setup
     */
    MessageBasedClient.prototype.getPairingRequestInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {};
                        return [4 /*yield*/, generate_uuid_1.generateGUID()];
                    case 1:
                        _a.id = _b.sent(),
                            _a.type = 'postmessage-pairing-request',
                            _a.name = this.name,
                            _a.version = constants_1.BEACON_VERSION;
                        return [4 /*yield*/, this.getPublicKey()];
                    case 2: return [2 /*return*/, (_a.publicKey = _b.sent(),
                            _a)];
                }
            });
        });
    };
    /**
     * Get the pairing response information. This will be shared with the peer during the connection setup
     */
    MessageBasedClient.prototype.getPairingResponseInfo = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {
                            id: request.id,
                            type: 'postmessage-pairing-response',
                            name: this.name,
                            version: constants_1.BEACON_VERSION
                        };
                        return [4 /*yield*/, this.getPublicKey()];
                    case 1: return [2 /*return*/, (_a.publicKey = _b.sent(),
                            _a)];
                }
            });
        });
    };
    /**
     * Unsubscribe from encrypted messages from a specific peer
     *
     * @param senderPublicKey
     */
    MessageBasedClient.prototype.unsubscribeFromEncryptedMessage = function (senderPublicKey) {
        return __awaiter(this, void 0, void 0, function () {
            var listener;
            return __generator(this, function (_a) {
                listener = this.activeListeners.get(senderPublicKey);
                if (!listener) {
                    return [2 /*return*/];
                }
                this.activeListeners.delete(senderPublicKey);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Unsubscribe from all encrypted messages
     */
    MessageBasedClient.prototype.unsubscribeFromEncryptedMessages = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.activeListeners.clear();
                return [2 /*return*/];
            });
        });
    };
    /**
     * Decrypt a message from a specific peer
     *
     * @param senderPublicKey
     * @param payload
     */
    MessageBasedClient.prototype.decryptMessage = function (senderPublicKey, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var sharedRx, hexPayload, decryptionError_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createCryptoBoxServer(senderPublicKey, this.keyPair.privateKey)];
                    case 1:
                        sharedRx = (_a.sent()).sharedRx;
                        hexPayload = Buffer.from(payload, 'hex');
                        if (!(hexPayload.length >=
                            sodium.crypto_secretbox_NONCEBYTES + sodium.crypto_secretbox_MACBYTES)) return [3 /*break*/, 5];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, crypto_1.decryptCryptoboxPayload(hexPayload, sharedRx)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        decryptionError_1 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5: throw new Error('Could not decrypt message');
                }
            });
        });
    };
    /**
     * Encrypt a message for a specific publicKey (receiver)
     *
     * @param recipientPublicKey
     * @param message
     */
    MessageBasedClient.prototype.encryptMessage = function (recipientPublicKey, message) {
        return __awaiter(this, void 0, void 0, function () {
            var sharedTx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createCryptoBoxClient(recipientPublicKey, this.keyPair.privateKey)];
                    case 1:
                        sharedTx = (_a.sent()).sharedTx;
                        return [2 /*return*/, crypto_1.encryptCryptoboxPayload(message, sharedTx)];
                }
            });
        });
    };
    return MessageBasedClient;
}(CommunicationClient_1.CommunicationClient));
exports.MessageBasedClient = MessageBasedClient;
//# sourceMappingURL=MessageBasedClient.js.map