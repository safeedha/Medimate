"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentModel = void 0;
const mongoose_1 = require("mongoose");
const AppointmentSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    doctor_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    schedule_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Slot',
        required: true,
    },
    patient_name: {
        type: String,
        required: true,
    },
    patient_email: {
        type: String,
        required: true,
    },
    patient_age: {
        type: Number,
        required: true,
    },
    patient_gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending',
    },
    payment_status: {
        type: String,
        enum: ['paid', 'unpaid'],
        default: 'unpaid',
    },
    reportAdded: {
        type: Boolean,
        default: false,
    },
    rescheduled_to: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Appointment',
    },
    isRescheduled: {
        type: Boolean,
        default: false,
    },
    // 🔽 New fields for follow-up
    followup_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Appointment', // Reference to the original appointment
        default: null,
    },
    followup_status: {
        type: Boolean,
        default: false,
    },
    followup_doc: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});
exports.AppointmentModel = (0, mongoose_1.model)('Appointment', AppointmentSchema);
