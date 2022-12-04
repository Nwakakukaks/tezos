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
exports.NetworkNotSupportedBeaconError = void 0;
var __1 = require("..");
/**
 * @category Error
 */
var NetworkNotSupportedBeaconError = /** @class */ (function (_super) {
    __extends(NetworkNotSupportedBeaconError, _super);
    function NetworkNotSupportedBeaconError() {
        var _this = _super.call(this, __1.BeaconErrorType.NETWORK_NOT_SUPPORTED, 'The wallet does not support this network. Please select another one.') || this;
        _this.name = 'NetworkNotSupportedBeaconError';
        _this.title = 'Network Error';
        return _this;
    }
    return NetworkNotSupportedBeaconError;
}(__1.BeaconError));
exports.NetworkNotSupportedBeaconError = NetworkNotSupportedBeaconError;
//# sourceMappingURL=NetworkNotSupportedBeaconError.js.map