"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceInTemplate = void 0;
exports.replaceInTemplate = function (text, placeholder, value) {
    return text.split("{{" + placeholder + "}}").join(value);
};
//# sourceMappingURL=replace-in-template.js.map