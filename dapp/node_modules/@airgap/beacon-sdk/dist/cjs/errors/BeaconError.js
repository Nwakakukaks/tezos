"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeaconError = void 0;
var assert_never_1 = require("../utils/assert-never");
var __1 = require("..");
/**
 * @category Error
 */
var BeaconError = /** @class */ (function () {
    function BeaconError(errorType, message) {
        this.name = 'BeaconError';
        this.title = 'Error'; // Visible in the UI
        this.message = "[" + errorType + "]:" + message;
        this.description = message;
    }
    Object.defineProperty(BeaconError.prototype, "fullDescription", {
        get: function () {
            return this.description;
        },
        enumerable: false,
        configurable: true
    });
    BeaconError.getError = function (errorType, errorData) {
        switch (errorType) {
            case __1.BeaconErrorType.BROADCAST_ERROR:
                return new __1.BroadcastBeaconError();
            case __1.BeaconErrorType.NETWORK_NOT_SUPPORTED:
                return new __1.NetworkNotSupportedBeaconError();
            case __1.BeaconErrorType.NO_ADDRESS_ERROR:
                return new __1.NoAddressBeaconError();
            case __1.BeaconErrorType.NO_PRIVATE_KEY_FOUND_ERROR:
                return new __1.NoPrivateKeyBeaconError();
            case __1.BeaconErrorType.NOT_GRANTED_ERROR:
                return new __1.NotGrantedBeaconError();
            case __1.BeaconErrorType.PARAMETERS_INVALID_ERROR:
                return new __1.ParametersInvalidBeaconError();
            case __1.BeaconErrorType.TOO_MANY_OPERATIONS:
                return new __1.TooManyOperationsBeaconError();
            case __1.BeaconErrorType.TRANSACTION_INVALID_ERROR:
                return new __1.TransactionInvalidBeaconError(errorData);
            case __1.BeaconErrorType.SIGNATURE_TYPE_NOT_SUPPORTED:
                return new __1.SignatureTypeNotSupportedBeaconError();
            // case BeaconErrorType.ENCRYPTION_TYPE_NOT_SUPPORTED:
            //   return new EncryptionTypeNotSupportedBeaconError()
            case __1.BeaconErrorType.ABORTED_ERROR:
                return new __1.AbortedBeaconError();
            case __1.BeaconErrorType.UNKNOWN_ERROR:
                return new __1.UnknownBeaconError();
            default:
                assert_never_1.assertNever(errorType);
        }
    };
    return BeaconError;
}());
exports.BeaconError = BeaconError;
//# sourceMappingURL=BeaconError.js.map