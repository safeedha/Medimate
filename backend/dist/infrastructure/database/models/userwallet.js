"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserwalletModel = void 0;
const mongoose_1 = require("mongoose");
const TransactionSchema = new mongoose_1.Schema({
    type: { type: String, enum: ['credit', 'debit'], required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now, required: true },
});
const UserWalletSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Doctor', required: true, unique: true },
    balance: { type: Number, required: true, default: 0 },
    transactions: { type: [TransactionSchema], default: [] },
    lastUpdated: { type: Date, default: Date.now },
});
exports.UserwalletModel = (0, mongoose_1.model)('UserWallet', UserWalletSchema);
