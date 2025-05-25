import { Schema, model } from 'mongoose';


import { AdminWalletTransaction } from '../../../domain/entities/adminwallet';
import { AdminWallet } from '../../../domain/entities/adminwallet';
const AdminWalletTransactionSchema = new Schema<AdminWalletTransaction>({
  type: {
    type: String,
    enum: ['credit', 'debit'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  from_user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',     
    default: null,
  },
  to_doctor_id: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',   
    default: null,
  },
  appointment_id: {
    type: Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true,
  },
 
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const AdminWalletSchema = new Schema<AdminWallet>({
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  transactions: {
    type: [AdminWalletTransactionSchema],
    default: [],
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
});

const AdminWalletModel = model('AdminWallet', AdminWalletSchema);

export default AdminWalletModel;
