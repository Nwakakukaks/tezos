"use strict";
// Helper functions from https://github.com/ionic-team/ionic-framework/blob/master/core/src/utils/platform.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDesktop = exports.isAndroid = exports.isIOS = exports.isMobile = exports.testUserAgent = void 0;
exports.testUserAgent = function (win, expr) {
    return expr.test(win.navigator.userAgent);
};
var matchMedia = function (win, query) { return win.matchMedia(query).matches; };
exports.isMobile = function (win) { return matchMedia(win, '(any-pointer:coarse)'); };
// const isCordova = (win: any): boolean => Boolean(win.cordova || win.phonegap || win.PhoneGap)
// const isCapacitorNative = (win: any): boolean => {
//   const capacitor = win.Capacitor
//   return Boolean(capacitor && capacitor.isNative)
// }
// const isHybrid = (win: Window): boolean => isCordova(win) || isCapacitorNative(win)
// const isMobileWeb = (win: Window): boolean => isMobile(win) && !isHybrid(win)
var isIpad = function (win) {
    // iOS 12 and below
    if (exports.testUserAgent(win, /iPad/i)) {
        return true;
    }
    // iOS 13+
    if (exports.testUserAgent(win, /Macintosh/i) && exports.isMobile(win)) {
        return true;
    }
    return false;
};
exports.isIOS = function (win) { return exports.testUserAgent(win, /iPhone|iPod/i) || isIpad(win); };
exports.isAndroid = function (win) { return exports.testUserAgent(win, /android|sink/i); };
exports.isDesktop = function (win) { return !exports.isMobile(win); };
//# sourceMappingURL=platform.js.map