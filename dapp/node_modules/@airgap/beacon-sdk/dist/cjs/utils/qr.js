"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQrData = void 0;
var qrcode = __importStar(require("qrcode-generator"));
var Logger_1 = require("./Logger");
var logger = new Logger_1.Logger('QR');
/**
 * Convert data to a QR code
 *
 * @param payload The data to be encoded as a QR code
 * @param type How the QR code will be encoded
 */
exports.getQrData = function (payload, type) {
    var typeNumber = 0;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    if (payload.length > 500) {
        logger.warn('getQrData', 'The size of the payload in the QR code is quite long and some devices might not be able to scan it anymore. To reduce the QR size, try using a shorter "name", "appUrl" and "iconUrl"');
    }
    try {
        qr.addData(payload);
        qr.make();
        if (type === 'svg') {
            return qr.createSvgTag();
        }
        else if (type === 'ascii') {
            var length_1 = qr.getModuleCount();
            var black = '\x1B[40m  \x1B[0m';
            var white = '\x1B[47m  \x1B[0m';
            var whiteLine = new Array(length_1 + 3).join(white);
            var blackLine = new Array(length_1 + 3).join(black);
            var ascii = '';
            ascii += blackLine + "\n";
            ascii += whiteLine + "\n";
            for (var x = 0; x < length_1; x++) {
                ascii += white;
                for (var y = 0; y < length_1; y++) {
                    ascii += qr.isDark(x, y) ? black : white;
                }
                ascii += white + "\n";
            }
            ascii += whiteLine;
            ascii += blackLine;
            return ascii;
        }
        else {
            return qr.createDataURL();
        }
    }
    catch (qrError) {
        console.error('error', qrError);
        throw qrError;
    }
};
//# sourceMappingURL=qr.js.map