import {Iuser} from './user';
import {Idoctor} from './doctor';
import {Appointment} from './appoinment';

export interface Transaction {
  _id: string;
  from_user_id: string | Iuser;    // null if admin initiated
  to_doctor_id: string | Idoctor; 
  appointment_id:string|Appointment   // null if incoming to admin
  amount: number;
  type: 'credit' | 'debit'; // credit for doctor, debit for user
  status: 'pending' | 'completed' | 'failed';
  created_at: Date;
}