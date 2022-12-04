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
exports.TooManyOperationsBeaconError = void 0;
var __1 = require("..");
/**
 * @category Error
 */
var TooManyOperationsBeaconError = /** @class */ (function (_super) {
    __extends(TooManyOperationsBeaconError, _super);
    function TooManyOperationsBeaconError() {
        var _this = _super.call(this, __1.BeaconErrorType.TOO_MANY_OPERATIONS, 'The request contains too many transactions. Please include fewer operations and try again.') || this;
        _this.name = 'TooManyOperationsBeaconError';
        _this.title = 'Too Many Operations';
        return _this;
    }
    return TooManyOperationsBeaconError;
}(__1.BeaconError));
exports.TooManyOperationsBeaconError = TooManyOperationsBeaconError;
//# sourceMappingURL=TooManyOperationsBeaconError.js.map