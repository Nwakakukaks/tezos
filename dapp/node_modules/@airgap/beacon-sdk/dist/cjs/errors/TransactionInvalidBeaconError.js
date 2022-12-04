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
exports.TransactionInvalidBeaconError = void 0;
var __1 = require("..");
/**
 * @category Error
 */
var TransactionInvalidBeaconError = /** @class */ (function (_super) {
    __extends(TransactionInvalidBeaconError, _super);
    function TransactionInvalidBeaconError(data) {
        var _this = _super.call(this, __1.BeaconErrorType.TRANSACTION_INVALID_ERROR, "The transaction is invalid and the node did not accept it.") || this;
        _this.data = data;
        _this.name = 'TransactionInvalidBeaconError';
        _this.title = 'Transaction Invalid';
        _this.data = data;
        return _this;
    }
    Object.defineProperty(TransactionInvalidBeaconError.prototype, "fullDescription", {
        get: function () {
            return this.description + "<br /><pre style=\"text-align: left\">" + JSON.stringify(this.data, undefined, 2) + "</pre>";
        },
        enumerable: false,
        configurable: true
    });
    return TransactionInvalidBeaconError;
}(__1.BeaconError));
exports.TransactionInvalidBeaconError = TransactionInvalidBeaconError;
//# sourceMappingURL=TransactionInvalidBeaconError.js.map