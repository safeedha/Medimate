import {Iuser} from './user';
import {Idoctor} from './doctor';
import {Appointment} from './appoinment';

export interface Transaction {
  type: 'credit' | 'debit';
  amount: number;
  appointmentId?: string|Appointment;
  note?: string;
  date: Date;
}

export interface IDoctorWallet  {
  doctorId:string|Idoctor;
  balance: number;
  transactions: Transaction[];
  lastUpdated: Date;
}
