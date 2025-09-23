import type{IUser} from './User';
import type{IDoctor} from './Doctor';
import type{Appointment} from './Appoinment';

export interface Transaction {
  _id: string;
  from_user_id: string | IUser;    // null if admin initiated
  to_doctor_id: string | IDoctor; 
  appointment_id:string|Appointment   // null if incoming to admin
  amount: number;
  type: 'credit' | 'debit'; // credit for doctor, debit for user
  status: 'pending' | 'completed' | 'failed';
  created_at: Date;
}