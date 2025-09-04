export interface AppointmentDto {
  _id?: string; 
  user_id: string
  doctor_id: string
  schedule_id: string 
  patient_name: string;
  patient_email: string;
  patient_age: number;
  patient_gender: 'male' | 'female' | 'other';
  reason: string;

  status: 'pending' |  'cancelled' | 'completed';
  payment_status: 'paid' | 'unpaid';
  rescheduled_to?: string,
  isRescheduled?:boolean;
  reportAdded?: boolean; 
  followup_id?:string,
  followup_status?:boolean
  
  followup_doc?:boolean
   
  created_at?: Date;
  updated_at?: Date;
}