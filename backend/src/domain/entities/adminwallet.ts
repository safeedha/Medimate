import {Iuser} from './user';
import {Idoctor} from './doctor';
import {Appointment} from './appoinment';

export interface AdminWalletTransaction {
  _id?: string;
  type: 'credit' | 'debit';              // credit: incoming from user, debit: payout to doctor
  amount: number;
  from_user_id: string |Iuser;           // user who paid (for credit), null if payout
  to_doctor_id: string | Idoctor;           // doctor who received (for debit), null if credit
  appointment_id: string|Appointment; // appointment associated with the transaction, null if not applicable
  timestamp: Date;
}

export interface AdminWallet {
  _id: string;
  balance: number;                       // total available balance in admin wallet
  transactions: AdminWalletTransaction[];
  last_updated: Date;
}