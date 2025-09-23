"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    senderId: {
        type: String,
        required: true,
    },
    recieverId: {
        type: String,
        required: true,
    },
    messageType: {
        type: String,
        enum: ['text', 'image'],
        required: true,
    },
    message: {
        type: String,
        required: function () {
            return this.messageType === 'text';
        },
    },
    image: {
        type: String,
        required: function () {
            return this.messageType === 'image';
        },
    },
    read: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.MessageModel = (0, mongoose_1.model)('Message', messageSchema);
