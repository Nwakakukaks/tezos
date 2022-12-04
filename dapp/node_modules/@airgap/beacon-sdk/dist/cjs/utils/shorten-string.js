"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortenString = void 0;
exports.shortenString = function (text) {
    if (text.length >= 12) {
        return text.substr(0, 5) + "..." + text.substr(-5);
    }
    return text;
};
//# sourceMappingURL=shorten-string.js.map