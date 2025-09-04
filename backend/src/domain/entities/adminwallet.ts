import {Iuser} from './User';
import {Idoctor} from './Doctor';
import {Appointment} from './Appoinment';

export interface AdminWalletTransaction {
  _id?: string;
  type: 'credit' | 'debit'|'refund';             
  amount: number;
  from: string |Iuser;          
  to: string | Idoctor; 
  toModel:'User'| 'Doctor'| 'Platform'
  doctorId:string|Idoctor          
  appointmentId?: string|Appointment; 
  paymentstatus:boolean
  date: Date;
}

export interface AdminWallet {
  _id: string;
  balance: number;                       // total available balance in admin wallet
  transactions: AdminWalletTransaction[];
  last_updated: Date;
}




// export interface AdminWalletTransaction{
//   type: 'credit' | 'debit';
//   amount: number;
//   from: string|Iuser; // user ID or 'platform'
//   to: string;   // doctor ID or 'platform'
//   doctorId?: string|Idoctor; // Optional
//   appointmentId: string|Appointment;
//   date?: Date;
//   description?: string;
// }

// export interface AdminWallet {
//   totalRevenue: number;
//   totalEarnings: number;
//   balance: number;
//   pendingPayouts: number;
//   transactions: AdminWalletTransaction[];
//   lastUpdated?: Date;
// }
