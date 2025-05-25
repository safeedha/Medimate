export interface Appointment {
  _id: string; 
  user_id: string; 
  doctor_id: string;
  schedule_id: string;
  

  // Patient details
  patient_name: string;
  patient_email: string;
  patient_age: number;
  patient_gender: 'male' | 'female' | 'other';
  reason: string;

  status: 'pending' |  'cancelled' | 'completed';
  payment_status: 'paid' | 'unpaid';

  created_at: Date;
  updated_at: Date;
}
