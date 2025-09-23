import {IUser} from './User';
import {IDoctor} from './Doctor';
import {IndividualSlot} from './Sot';

export interface Appointment {
  _id?: string; 
  user_id: string| IUser; 
  doctor_id: string| IDoctor; 
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
  
  followup_doc?:boolean
   
  created_at?: Date;
  updated_at?: Date;
}

export type AppointmentCountByDate = {
  _id: string;    
  count: number;
};

