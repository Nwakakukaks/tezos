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
import { Logger } from '../utils/Logger';
const logger = new Logger('IncomingRequestInterceptor');
/**
 * @internalapi
 *
 * The IncomingRequestInterceptor is used in the WalletClient to intercept an incoming request and enrich it with data, like app metadata.
 */
export class IncomingRequestInterceptor {
    /**
     * The method that is called during the interception
     *
     * @param config
     */
    static intercept(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const { message, connectionInfo, appMetadataManager, interceptorCallback } = config;
            // TODO: Remove v1 compatibility in later version
            if (message.beaconId && !message.senderId) {
                message.senderId = message.beaconId;
                delete message.beaconId;
            }
            switch (message.type) {
                case BeaconMessageType.PermissionRequest:
                    {
                        // TODO: Remove v1 compatibility in later version
                        if (message.appMetadata.beaconId && !message.appMetadata.senderId) {
                            message.appMetadata.senderId = message.appMetadata.beaconId;
                            delete message.appMetadata.beaconId;
                        }
                        yield appMetadataManager.addAppMetadata(message.appMetadata);
                        const request = message;
                        interceptorCallback(request, connectionInfo);
                    }
                    break;
                case BeaconMessageType.OperationRequest:
                    {
                        const appMetadata = yield IncomingRequestInterceptor.getAppMetadata(appMetadataManager, message.senderId);
                        const request = Object.assign({ appMetadata }, message);
                        interceptorCallback(request, connectionInfo);
                    }
                    break;
                case BeaconMessageType.SignPayloadRequest:
                    {
                        const appMetadata = yield IncomingRequestInterceptor.getAppMetadata(appMetadataManager, message.senderId);
                        const request = Object.assign({ appMetadata }, message);
                        interceptorCallback(request, connectionInfo);
                    }
                    break;
                // TODO: ENCRYPTION
                // case BeaconMessageType.EncryptPayloadRequest:
                //   {
                //     const appMetadata: AppMetadata = await IncomingRequestInterceptor.getAppMetadata(
                //       appMetadataManager,
                //       message.senderId
                //     )
                //     const request: EncryptPayloadRequestOutput = {
                //       appMetadata,
                //       ...message
                //     }
                //     interceptorCallback(request, connectionInfo)
                //   }
                //   break
                case BeaconMessageType.BroadcastRequest:
                    {
                        const appMetadata = yield IncomingRequestInterceptor.getAppMetadata(appMetadataManager, message.senderId);
                        const request = Object.assign({ appMetadata }, message);
                        interceptorCallback(request, connectionInfo);
                    }
                    break;
                default:
                    logger.log('intercept', 'Message not handled');
                    assertNever(message);
            }
        });
    }
    static getAppMetadata(appMetadataManager, senderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const appMetadata = yield appMetadataManager.getAppMetadata(senderId);
            if (!appMetadata) {
                throw new Error('AppMetadata not found');
            }
            return appMetadata;
        });
    }
}
//# sourceMappingURL=IncomingRequestInterceptor.js.map