"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTextMessageEvent = exports.isMessageEvent = exports.isJoinEvent = exports.isCreateEvent = void 0;
var MatrixMessage_1 = require("../models/MatrixMessage");
/**
 * Check if an event is a create event
 *
 * @param event MatrixStateEvent
 */
exports.isCreateEvent = function (event) {
    return event.type === 'm.room.create' && event.content instanceof Object && 'creator' in event.content;
};
/**
 * Check if an event is a join event
 *
 * @param event MatrixStateEvent
 */
exports.isJoinEvent = function (event) {
    return event.type === 'm.room.member' &&
        event.content instanceof Object &&
        'membership' in event.content &&
        // eslint-disable-next-line dot-notation
        event.content['membership'] === 'join';
};
/**
 * Check if an event is a message event
 *
 * @param event MatrixStateEvent
 */
exports.isMessageEvent = function (event) { return event.type === 'm.room.message'; };
/**
 * Check if an event is a text message event
 *
 * @param event MatrixStateEvent
 */
exports.isTextMessageEvent = function (event) {
    return exports.isMessageEvent(event) &&
        event.content instanceof Object &&
        'msgtype' in event.content &&
        // eslint-disable-next-line dot-notation
        event.content['msgtype'] === MatrixMessage_1.MatrixMessageType.TEXT;
};
//# sourceMappingURL=events.js.map