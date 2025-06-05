import mongoose, { Schema,model} from 'mongoose';
import{Transaction} from '../../../domain/entities/userwallet';
import {IUserWallet} from '../../../domain/entities/userwallet';
const TransactionSchema = new Schema<Transaction>(
  {
    type: { type: String, enum: ['credit', 'debit'], required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now, required: true },
  },
);


const UserWalletSchema = new Schema<IUserWallet>({
  userId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true, unique: true },
  balance: { type: Number, required: true, default: 0 },
  transactions: { type: [TransactionSchema], default: [] },
  lastUpdated: { type: Date, default: Date.now },
});

export const UserwalletModel = model('UserWallet', UserWalletSchema);