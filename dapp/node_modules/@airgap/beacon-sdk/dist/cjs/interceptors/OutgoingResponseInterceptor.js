"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.OutgoingResponseInterceptor = void 0;
var assert_never_1 = require("../utils/assert-never");
var __1 = require("..");
var constants_1 = require("../constants");
var crypto_1 = require("../utils/crypto");
var get_account_identifier_1 = require("../utils/get-account-identifier");
var BeaconErrorType_1 = require("../types/BeaconErrorType");
var Logger_1 = require("../utils/Logger");
var logger = new Logger_1.Logger('OutgoingResponseInterceptor');
/**
 * @internalapi
 *
 * The OutgoingResponseInterceptor is used in the WalletClient to intercept an outgoing response and enrich it with data.
 */
var OutgoingResponseInterceptor = /** @class */ (function () {
    function OutgoingResponseInterceptor() {
    }
    OutgoingResponseInterceptor.intercept = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var senderId, request, message, ownAppMetadata, permissionManager, appMetadataManager, interceptorCallback, interceptorCallbackWrapper, _a, response, errorData, response, response, publicKey, address, appMetadata, permission, _b, response, response, response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        senderId = config.senderId, request = config.request, message = config.message, ownAppMetadata = config.ownAppMetadata, permissionManager = config.permissionManager, appMetadataManager = config.appMetadataManager, interceptorCallback = config.interceptorCallback;
                        interceptorCallbackWrapper = function (msg) {
                            var untypedMessage = msg;
                            untypedMessage.beaconId = msg.senderId;
                            interceptorCallback(msg);
                        };
                        _a = message.type;
                        switch (_a) {
                            case __1.BeaconMessageType.Error: return [3 /*break*/, 1];
                            case __1.BeaconMessageType.Acknowledge: return [3 /*break*/, 2];
                            case __1.BeaconMessageType.PermissionResponse: return [3 /*break*/, 3];
                            case __1.BeaconMessageType.OperationResponse: return [3 /*break*/, 7];
                            case __1.BeaconMessageType.SignPayloadResponse: return [3 /*break*/, 8];
                            case __1.BeaconMessageType.BroadcastResponse: return [3 /*break*/, 9];
                        }
                        return [3 /*break*/, 10];
                    case 1:
                        {
                            response = {
                                type: message.type,
                                version: constants_1.BEACON_VERSION,
                                senderId: senderId,
                                id: message.id,
                                errorType: message.errorType
                            };
                            if (message.errorType === BeaconErrorType_1.BeaconErrorType.TRANSACTION_INVALID_ERROR && message.errorData) {
                                errorData = message.errorData;
                                // Check if error data is in correct format
                                if (Array.isArray(errorData) &&
                                    errorData.every(function (item) { return Boolean(item.kind) && Boolean(item.id); })) {
                                    response.errorData = message.errorData;
                                }
                                else {
                                    logger.warn('ErrorData provided is not in correct format. It needs to be an array of RPC errors. It will not be included in the message sent to the dApp');
                                }
                            }
                            interceptorCallbackWrapper(response);
                            return [3 /*break*/, 11];
                        }
                        _c.label = 2;
                    case 2:
                        {
                            response = {
                                type: message.type,
                                version: constants_1.BEACON_VERSION,
                                senderId: senderId,
                                id: message.id
                            };
                            interceptorCallbackWrapper(response);
                            return [3 /*break*/, 11];
                        }
                        _c.label = 3;
                    case 3:
                        response = __assign({ senderId: senderId, version: constants_1.BEACON_VERSION, appMetadata: ownAppMetadata }, message);
                        publicKey = response.publicKey || response.pubkey || response.pubKey;
                        return [4 /*yield*/, crypto_1.getAddressFromPublicKey(publicKey)];
                    case 4:
                        address = _c.sent();
                        return [4 /*yield*/, appMetadataManager.getAppMetadata(request.senderId)];
                    case 5:
                        appMetadata = _c.sent();
                        if (!appMetadata) {
                            throw new Error('AppMetadata not found');
                        }
                        _b = {};
                        return [4 /*yield*/, get_account_identifier_1.getAccountIdentifier(address, response.network)];
                    case 6:
                        permission = (_b.accountIdentifier = _c.sent(),
                            _b.senderId = request.senderId,
                            _b.appMetadata = appMetadata,
                            _b.website = '',
                            _b.address = address,
                            _b.publicKey = publicKey,
                            _b.network = response.network,
                            _b.scopes = response.scopes,
                            _b.connectedAt = new Date().getTime(),
                            _b);
                        permissionManager.addPermission(permission).catch(console.error);
                        interceptorCallbackWrapper(response);
                        return [3 /*break*/, 11];
                    case 7:
                        {
                            response = __assign({ senderId: senderId, version: constants_1.BEACON_VERSION }, message);
                            interceptorCallbackWrapper(response);
                        }
                        return [3 /*break*/, 11];
                    case 8:
                        {
                            response = __assign({ senderId: senderId, version: constants_1.BEACON_VERSION }, message);
                            interceptorCallbackWrapper(response);
                        }
                        return [3 /*break*/, 11];
                    case 9:
                        {
                            response = __assign({ senderId: senderId, version: constants_1.BEACON_VERSION }, message);
                            interceptorCallbackWrapper(response);
                        }
                        return [3 /*break*/, 11];
                    case 10:
                        logger.log('intercept', 'Message not handled');
                        assert_never_1.assertNever(message);
                        _c.label = 11;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    return OutgoingResponseInterceptor;
}());
exports.OutgoingResponseInterceptor = OutgoingResponseInterceptor;
//# sourceMappingURL=OutgoingResponseInterceptor.js.map