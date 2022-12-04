"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDebugEnabled = exports.setDebugEnabled = void 0;
var MockWindow_1 = require("./MockWindow");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var debug = MockWindow_1.windowRef.beaconSdkDebugEnabled ? true : false;
if (debug) {
    // eslint-disable-next-line no-console
    console.log('[BEACON]: Debug mode is ON (turned on either by the developer or a browser extension)');
}
exports.setDebugEnabled = function (enabled) {
    debug = enabled;
};
exports.getDebugEnabled = function () { return debug; };
//# sourceMappingURL=debug.js.map