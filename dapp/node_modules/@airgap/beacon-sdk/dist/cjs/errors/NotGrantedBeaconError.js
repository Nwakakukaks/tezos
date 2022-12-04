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
exports.NotGrantedBeaconError = void 0;
var __1 = require("..");
/**
 * @category Error
 */
var NotGrantedBeaconError = /** @class */ (function (_super) {
    __extends(NotGrantedBeaconError, _super);
    function NotGrantedBeaconError() {
        var _this = _super.call(this, __1.BeaconErrorType.NOT_GRANTED_ERROR, 'You do not have the necessary permissions to perform this action. Please initiate another permission request and give the necessary permissions.') || this;
        _this.name = 'NotGrantedBeaconError';
        _this.title = 'Permission Not Granted';
        return _this;
    }
    return NotGrantedBeaconError;
}(__1.BeaconError));
exports.NotGrantedBeaconError = NotGrantedBeaconError;
//# sourceMappingURL=NotGrantedBeaconError.js.map