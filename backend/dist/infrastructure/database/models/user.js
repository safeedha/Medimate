"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String },
    email: { type: String, required: true },
    password: { type: String },
    phone: { type: String, default: null },
    googleIds: { type: String, default: null },
    isBlocked: { type: Boolean, required: true, default: false },
    googleVerified: { type: Boolean, default: false },
    lastMessage: { type: Date, default: Date.now },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    },
    age: {
        type: Number,
    },
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)('User', UserSchema);
