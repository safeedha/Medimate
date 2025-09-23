
import {IDoctor} from './Doctor';
import {Appointment} from './Appoinment';

export interface Transaction {
  type: 'credit' | 'debit';
  amount: number;
  appointmentId?: string|Appointment;
  note?: string;
  date: Date;
}

export interface IDoctorWallet  {
  doctorId:string|IDoctor;
  balance: number;
  transactions: Transaction[];
  lastUpdated: Date;
}
