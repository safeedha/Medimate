"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slot = void 0;
const mongoose_1 = require("mongoose");
const individualSlotSchema = new mongoose_1.Schema({
    recurringSlotId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Recurring', required: true },
    doctorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    date: { type: Date, required: true },
    startingTime: { type: String },
    endTime: { type: String },
    status: { type: String, enum: ["available", "booked", "cancelled"], default: "available" },
}, {
    timestamps: true // adds createdAt and updatedAt
});
exports.Slot = (0, mongoose_1.model)('Slot', individualSlotSchema);
