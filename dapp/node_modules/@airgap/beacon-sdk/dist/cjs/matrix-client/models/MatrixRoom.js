"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatrixRoom = exports.MatrixRoomStatus = void 0;
var events_1 = require("../utils/events");
var MatrixMessage_1 = require("./MatrixMessage");
var MatrixRoomStatus;
(function (MatrixRoomStatus) {
    MatrixRoomStatus[MatrixRoomStatus["UNKNOWN"] = 0] = "UNKNOWN";
    MatrixRoomStatus[MatrixRoomStatus["JOINED"] = 1] = "JOINED";
    MatrixRoomStatus[MatrixRoomStatus["INVITED"] = 2] = "INVITED";
    MatrixRoomStatus[MatrixRoomStatus["LEFT"] = 3] = "LEFT";
})(MatrixRoomStatus = exports.MatrixRoomStatus || (exports.MatrixRoomStatus = {}));
var MatrixRoom = /** @class */ (function () {
    function MatrixRoom(id, status, members, messages) {
        if (status === void 0) { status = MatrixRoomStatus.UNKNOWN; }
        if (members === void 0) { members = []; }
        if (messages === void 0) { messages = []; }
        this.id = id;
        this.status = status;
        this.members = members;
        this.messages = messages;
    }
    /**
     * Reconstruct rooms from a sync response
     *
     * @param roomSync
     */
    MatrixRoom.fromSync = function (roomSync) {
        function create(rooms, creator) {
            return Object.entries(rooms).map(function (_a) {
                var id = _a[0], room = _a[1];
                return creator(id, room);
            });
        }
        return __spreadArrays(create(roomSync.join, MatrixRoom.fromJoined), create(roomSync.invite, MatrixRoom.fromInvited), create(roomSync.leave, MatrixRoom.fromLeft));
    };
    /**
     * Reconstruct a room from an ID or object
     *
     * @param roomOrId
     * @param status
     */
    MatrixRoom.from = function (roomOrId, status) {
        return typeof roomOrId === 'string'
            ? new MatrixRoom(roomOrId, status || MatrixRoomStatus.UNKNOWN)
            : status !== undefined
                ? new MatrixRoom(roomOrId.id, status, roomOrId.members, roomOrId.messages)
                : roomOrId;
    };
    /**
     * Merge new and old state and remove duplicates
     *
     * @param newState
     * @param previousState
     */
    MatrixRoom.merge = function (newState, previousState) {
        if (!previousState || previousState.id !== newState.id) {
            return MatrixRoom.from(newState);
        }
        return new MatrixRoom(newState.id, newState.status, __spreadArrays(previousState.members, newState.members).filter(function (member, index, array) { return array.indexOf(member) === index; }), __spreadArrays(previousState.messages, newState.messages));
    };
    /**
     * Create a room from a join
     *
     * @param id
     * @param joined
     */
    MatrixRoom.fromJoined = function (id, joined) {
        var events = __spreadArrays(joined.state.events, joined.timeline.events);
        var members = MatrixRoom.getMembersFromEvents(events);
        var messages = MatrixRoom.getMessagesFromEvents(events);
        return new MatrixRoom(id, MatrixRoomStatus.JOINED, members, messages);
    };
    /**
     * Create a room from an invite
     *
     * @param id
     * @param invited
     */
    MatrixRoom.fromInvited = function (id, invited) {
        var members = MatrixRoom.getMembersFromEvents(invited.invite_state.events);
        return new MatrixRoom(id, MatrixRoomStatus.INVITED, members);
    };
    /**
     * Create a room from a leave
     *
     * @param id
     * @param left
     */
    MatrixRoom.fromLeft = function (id, left) {
        var events = __spreadArrays(left.state.events, left.timeline.events);
        var members = MatrixRoom.getMembersFromEvents(events);
        var messages = MatrixRoom.getMessagesFromEvents(events);
        return new MatrixRoom(id, MatrixRoomStatus.LEFT, members, messages);
    };
    /**
     * Extract members from an event
     *
     * @param events
     */
    MatrixRoom.getMembersFromEvents = function (events) {
        return MatrixRoom.getUniqueEvents(events.filter(function (event) { return events_1.isCreateEvent(event) || events_1.isJoinEvent(event); }))
            .map(function (event) { return event.sender; })
            .filter(function (member, index, array) { return array.indexOf(member) === index; });
    };
    /**
     * Extract messages from an event
     *
     * @param events
     */
    MatrixRoom.getMessagesFromEvents = function (events) {
        return MatrixRoom.getUniqueEvents(events.filter(events_1.isMessageEvent))
            .map(function (event) { return MatrixMessage_1.MatrixMessage.from(event); })
            .filter(Boolean);
    };
    /**
     * Get unique events and remove duplicates
     *
     * @param events
     */
    MatrixRoom.getUniqueEvents = function (events) {
        var eventIds = {};
        var uniqueEvents = [];
        events.forEach(function (event, index) {
            var eventId = event.event_id;
            if (eventId === undefined || !(eventId in eventIds)) {
                if (eventId !== undefined) {
                    eventIds[eventId] = index;
                }
                uniqueEvents.push(event);
            }
        });
        return uniqueEvents;
    };
    return MatrixRoom;
}());
exports.MatrixRoom = MatrixRoom;
//# sourceMappingURL=MatrixRoom.js.map