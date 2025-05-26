import {Iuser} from './user';
import {Idoctor} from './doctor';
import {IndividualSlot} from './slot';

export interface Appointment {
  _id?: string; 
  user_id: string| Iuser; // User who booked the appointment
  doctor_id: string| Idoctor; // Doctor for the appointment
  schedule_id: string| IndividualSlot; // Schedule details for the appointment
  

 
  patient_name: string;
  patient_email: string;
  patient_age: number;
  patient_gender: 'male' | 'female' | 'other';
  reason: string;

  status: 'pending' |  'cancelled' | 'completed';
  payment_status: 'paid' | 'unpaid';

  created_at?: Date;
  updated_at?: Date;
}
