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
exports.WalletPostMessageTransport = void 0;
var __1 = require("..");
// const logger = new Logger('WalletPostMessageTransport')
/**
 * @internalapi
 *
 *
 */
var WalletPostMessageTransport = /** @class */ (function (_super) {
    __extends(WalletPostMessageTransport, _super);
    function WalletPostMessageTransport(name, keyPair, storage) {
        return _super.call(this, name, keyPair, storage, __1.StorageKey.TRANSPORT_POSTMESSAGE_PEERS_WALLET) || this;
    }
    return WalletPostMessageTransport;
}(__1.PostMessageTransport));
exports.WalletPostMessageTransport = WalletPostMessageTransport;
//# sourceMappingURL=WalletPostMessageTransport.js.map