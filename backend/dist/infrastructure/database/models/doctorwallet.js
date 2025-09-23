"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorWalletModel = void 0;
const mongoose_1 = require("mongoose");
const TransactionSchema = new mongoose_1.Schema({
    type: { type: String, enum: ['credit', 'debit'], required: true },
    amount: { type: Number, required: true },
    appointmentId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Appointment' },
    date: { type: Date, default: Date.now, required: true },
});
const DoctorWalletSchema = new mongoose_1.Schema({
    doctorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Doctor', required: true, unique: true },
    balance: { type: Number, required: true, default: 0 },
    transactions: { type: [TransactionSchema], default: [] },
    lastUpdated: { type: Date, default: Date.now },
});
exports.DoctorWalletModel = (0, mongoose_1.model)('DoctorWallet', DoctorWalletSchema);
