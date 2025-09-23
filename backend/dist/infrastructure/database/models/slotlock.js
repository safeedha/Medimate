"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotLock = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const slotLockSchema = new mongoose_1.default.Schema({
    doctorId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    slotId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Slot',
        required: true,
    },
    status: {
        type: String,
        enum: ['locked', 'confirmed', 'expired'],
        default: 'locked',
    },
    lockedAt: {
        type: Date,
        default: Date.now,
        expires: 300,
    },
});
exports.SlotLock = mongoose_1.default.model('SlotLock', slotLockSchema);
