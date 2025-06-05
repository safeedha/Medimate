import {Iuser} from './user';
import {Idoctor} from './doctor';
import {Appointment} from './appoinment';

export interface Transaction {
  type: 'credit' | 'debit';
  amount: number;
  date: Date;
}

export interface IUserWallet  {
  userId:string|Iuser;
  balance: number;
  transactions: Transaction[];
  lastUpdated: Date;
}
