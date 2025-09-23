"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const medicineSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    duration: { type: String, required: true },
    notes: { type: String } // optional
}, { _id: false });
const reportSchema = new mongoose_1.default.Schema({
    content: {
        type: String,
        required: true,
    },
    appointmentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    medicine: [medicineSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.Report = mongoose_1.default.model('Report', reportSchema);
