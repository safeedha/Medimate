import { Schema, model } from 'mongoose';
import { Transaction } from '../../../domain/entities/Transaction';

const transactionSchema = new Schema<Transaction>({
  from_user_id: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  to_doctor_id: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  appointment_id: { type: Schema.Types.ObjectId, ref: 'Appointment', default: null },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['credit', 'debit'], required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], required: true },
  created_at: { type: Date, default: Date.now }
});

export const TransactionModel = model<Transaction>('Transaction', transactionSchema);
