"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColorMode = exports.setColorMode = void 0;
var ColorMode_1 = require("./types/ColorMode");
var colorMode = ColorMode_1.ColorMode.LIGHT;
exports.setColorMode = function (mode) {
    colorMode = mode;
};
exports.getColorMode = function () { return colorMode; };
//# sourceMappingURL=colorMode.js.map