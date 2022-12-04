"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availableTransports = void 0;
var __1 = require("..");
/**
 * An object with promises to indicate whether or not that transport is available.
 */
exports.availableTransports = {
    extension: __1.PostMessageTransport.isAvailable(),
    availableExtensions: __1.PostMessageTransport.getAvailableExtensions()
};
//# sourceMappingURL=available-transports.js.map