"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recurring = void 0;
const mongoose_1 = require("mongoose");
const recurringSchema = new mongoose_1.Schema({
    doctorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Doctor', required: true }, // assuming doctor is another collection
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    frequency: { type: String, enum: ['WEEKLY', 'DAILY'], required: true },
    interval: { type: Number, default: 1 }, // e.g., every 1 week or 1 day
    daysOfWeek: {
        type: [{ type: String, enum: ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'] }],
        required: true,
    },
    starttime: { type: String, required: true },
    endttime: { type: String, required: true }
}, { timestamps: true });
exports.Recurring = (0, mongoose_1.model)('Recurring', recurringSchema);
