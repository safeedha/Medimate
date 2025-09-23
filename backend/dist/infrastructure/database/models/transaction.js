"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModel = void 0;
const mongoose_1 = require("mongoose");
const transactionSchema = new mongoose_1.Schema({
    from_user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', default: null },
    to_doctor_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    appointment_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Appointment', default: null },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['credit', 'debit'], required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], required: true },
    created_at: { type: Date, default: Date.now }
});
exports.TransactionModel = (0, mongoose_1.model)('Transaction', transactionSchema);
