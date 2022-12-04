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
exports.UnknownBeaconError = void 0;
var __1 = require("..");
/**
 * @category Error
 */
var UnknownBeaconError = /** @class */ (function (_super) {
    __extends(UnknownBeaconError, _super);
    function UnknownBeaconError() {
        var _this = _super.call(this, __1.BeaconErrorType.UNKNOWN_ERROR, 'An unknown error occured. Please try again or report it to a developer.') || this;
        _this.name = 'UnknownBeaconError';
        _this.title = 'Error';
        return _this;
    }
    return UnknownBeaconError;
}(__1.BeaconError));
exports.UnknownBeaconError = UnknownBeaconError;
//# sourceMappingURL=UnknownBeaconError.js.map