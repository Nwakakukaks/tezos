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
exports.AbortedBeaconError = void 0;
var __1 = require("..");
/**
 * @category Error
 */
var AbortedBeaconError = /** @class */ (function (_super) {
    __extends(AbortedBeaconError, _super);
    function AbortedBeaconError() {
        var _this = _super.call(this, __1.BeaconErrorType.ABORTED_ERROR, 'The action was aborted by the user.') || this;
        _this.name = 'UnknownBeaconError';
        _this.title = 'Aborted';
        return _this;
    }
    return AbortedBeaconError;
}(__1.BeaconError));
exports.AbortedBeaconError = AbortedBeaconError;
//# sourceMappingURL=AbortedBeaconError.js.map