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
exports.NoAddressBeaconError = void 0;
var __1 = require("..");
/**
 * @category Error
 */
var NoAddressBeaconError = /** @class */ (function (_super) {
    __extends(NoAddressBeaconError, _super);
    function NoAddressBeaconError() {
        var _this = _super.call(this, __1.BeaconErrorType.NO_ADDRESS_ERROR, 'The wallet does not have an account set up. Please make sure to set up your wallet and try again.') || this;
        _this.name = 'NoAddressBeaconError';
        _this.title = 'No Address';
        return _this;
    }
    return NoAddressBeaconError;
}(__1.BeaconError));
exports.NoAddressBeaconError = NoAddressBeaconError;
//# sourceMappingURL=NoAddressBeaconError.js.map