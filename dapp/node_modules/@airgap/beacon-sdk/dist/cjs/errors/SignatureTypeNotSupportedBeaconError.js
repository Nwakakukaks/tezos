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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureTypeNotSupportedBeaconError = void 0;
var __1 = require("..");
/**
 * @category Error
 */
var SignatureTypeNotSupportedBeaconError = /** @class */ (function (_super) {
    __extends(SignatureTypeNotSupportedBeaconError, _super);
    function SignatureTypeNotSupportedBeaconError() {
        var _this = _super.call(this, __1.BeaconErrorType.SIGNATURE_TYPE_NOT_SUPPORTED, 'The wallet is not able to sign payloads of this type.') || this;
        _this.name = 'SignatureTypeNotSupportedBeaconError';
        _this.title = 'Signature Type Not Supported';
        return _this;
    }
    return SignatureTypeNotSupportedBeaconError;
}(__1.BeaconError));
exports.SignatureTypeNotSupportedBeaconError = SignatureTypeNotSupportedBeaconError;
//# sourceMappingURL=SignatureTypeNotSupportedBeaconError.js.map