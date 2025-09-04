import { Schema,model} from 'mongoose';
import{UserTransaction} from '../../../domain/entities/Userwallet';
import {IUserWallet} from '../../../domain/entities/Userwallet';
const TransactionSchema = new Schema<UserTransaction>(
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