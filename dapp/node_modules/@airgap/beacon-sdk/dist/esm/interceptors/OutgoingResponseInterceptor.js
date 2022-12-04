var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { assertNever } from '../utils/assert-never';
import { BeaconMessageType } from '..';
import { BEACON_VERSION } from '../constants';
import { getAddressFromPublicKey } from '../utils/crypto';
import { getAccountIdentifier } from '../utils/get-account-identifier';
import { BeaconErrorType } from '../types/BeaconErrorType';
import { Logger } from '../utils/Logger';
const logger = new Logger('OutgoingResponseInterceptor');
/**
 * @internalapi
 *
 * The OutgoingResponseInterceptor is used in the WalletClient to intercept an outgoing response and enrich it with data.
 */
export class OutgoingResponseInterceptor {
    static intercept(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const { senderId, request, message, ownAppMetadata, permissionManager, appMetadataManager, interceptorCallback } = config;
            // TODO: Remove v1 compatibility in later version
            const interceptorCallbackWrapper = (msg) => {
                const untypedMessage = msg;
                untypedMessage.beaconId = msg.senderId;
                interceptorCallback(msg);
            };
            switch (message.type) {
                case BeaconMessageType.Error: {
                    const response = {
                        type: message.type,
                        version: BEACON_VERSION,
                        senderId,
                        id: message.id,
                        errorType: message.errorType
                    };
                    if (message.errorType === BeaconErrorType.TRANSACTION_INVALID_ERROR && message.errorData) {
                        const errorData = message.errorData;
                        // Check if error data is in correct format
                        if (Array.isArray(errorData) &&
                            errorData.every((item) => Boolean(item.kind) && Boolean(item.id))) {
                            response.errorData = message.errorData;
                        }
                        else {
                            logger.warn('ErrorData provided is not in correct format. It needs to be an array of RPC errors. It will not be included in the message sent to the dApp');
                        }
                    }
                    interceptorCallbackWrapper(response);
                    break;
                }
                case BeaconMessageType.Acknowledge: {
                    const response = {
                        type: message.type,
                        version: BEACON_VERSION,
                        senderId,
                        id: message.id
                    };
                    interceptorCallbackWrapper(response);
                    break;
                }
                case BeaconMessageType.PermissionResponse: {
                    const response = Object.assign({ senderId, version: BEACON_VERSION, appMetadata: ownAppMetadata }, message);
                    // TODO: Migration code. Remove sometime after 1.0.0 release.
                    const publicKey = response.publicKey || response.pubkey || response.pubKey;
                    const address = yield getAddressFromPublicKey(publicKey);
                    const appMetadata = yield appMetadataManager.getAppMetadata(request.senderId);
                    if (!appMetadata) {
                        throw new Error('AppMetadata not found');
                    }
                    const permission = {
                        accountIdentifier: yield getAccountIdentifier(address, response.network),
                        senderId: request.senderId,
                        appMetadata,
                        website: '',
                        address,
                        publicKey,
                        network: response.network,
                        scopes: response.scopes,
                        connectedAt: new Date().getTime()
                    };
                    permissionManager.addPermission(permission).catch(console.error);
                    interceptorCallbackWrapper(response);
                    break;
                }
                case BeaconMessageType.OperationResponse:
                    {
                        const response = Object.assign({ senderId, version: BEACON_VERSION }, message);
                        interceptorCallbackWrapper(response);
                    }
                    break;
                case BeaconMessageType.SignPayloadResponse:
                    {
                        const response = Object.assign({ senderId, version: BEACON_VERSION }, message);
                        interceptorCallbackWrapper(response);
                    }
                    break;
                // TODO: ENCRYPTION
                // case BeaconMessageType.EncryptPayloadResponse:
                //   {
                //     const response: EncryptPayloadResponse = {
                //       senderId,
                //       version: BEACON_VERSION,
                //       ...message
                //     }
                //     interceptorCallbackWrapper(response)
                //   }
                //   break
                case BeaconMessageType.BroadcastResponse:
                    {
                        const response = Object.assign({ senderId, version: BEACON_VERSION }, message);
                        interceptorCallbackWrapper(response);
                    }
                    break;
                default:
                    logger.log('intercept', 'Message not handled');
                    assertNever(message);
            }
        });
    }
}
//# sourceMappingURL=OutgoingResponseInterceptor.js.map