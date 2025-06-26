import {Iuser} from './user';
import {Idoctor} from './doctor';
import {IndividualSlot} from './slot';

export interface Appointment {
  _id?: string; 
  user_id: string| Iuser; 
  doctor_id: string| Idoctor; 
  schedule_id: string| IndividualSlot; 
  patient_name: string;
  patient_email: string;
  patient_age: number;
  patient_gender: 'male' | 'female' | 'other';
  reason: string;

  status: 'pending' |  'cancelled' | 'completed';
  payment_status: 'paid' | 'unpaid';
  rescheduled_to?: string| Appointment,
  isRescheduled?:boolean;
  reportAdded?: boolean; 
  followup_id?:string|Appointment,
  followup_status?:boolean

   
  created_at?: Date;
  updated_at?: Date;
}
