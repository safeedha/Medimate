import  { Schema,model} from 'mongoose';
import{Transaction} from '../../../domain/entities/Doctorwallet';
import {IDoctorWallet} from '../../../domain/entities/Doctorwallet';
const TransactionSchema = new Schema<Transaction>(
  {
    type: { type: String, enum: ['credit', 'debit'], required: true },
    amount: { type: Number, required: true },
    appointmentId: { type: Schema.Types.ObjectId, ref: 'Appointment' },
    date: { type: Date, default: Date.now, required: true },
  },
);


const DoctorWalletSchema = new Schema<IDoctorWallet>({
  doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true, unique: true },
  balance: { type: Number, required: true, default: 0 },
  transactions: { type: [TransactionSchema], default: [] },
  lastUpdated: { type: Date, default: Date.now },
});

export const DoctorWalletModel = model('DoctorWallet', DoctorWalletSchema);