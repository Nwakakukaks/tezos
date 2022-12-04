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
exports.BroadcastBeaconError = void 0;
var __1 = require("..");
/**
 * @category Error
 */
var BroadcastBeaconError = /** @class */ (function (_super) {
    __extends(BroadcastBeaconError, _super);
    function BroadcastBeaconError() {
        var _this = _super.call(this, __1.BeaconErrorType.BROADCAST_ERROR, 'The transaction could not be broadcast to the network. Please try again.') || this;
        _this.name = 'BroadcastBeaconError';
        _this.title = 'Broadcast Error';
        return _this;
    }
    return BroadcastBeaconError;
}(__1.BeaconError));
exports.BroadcastBeaconError = BroadcastBeaconError;
//# sourceMappingURL=BroadcastBeaconError.js.map