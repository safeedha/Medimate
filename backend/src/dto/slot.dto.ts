import {DoctorDTO} from './doctor.dto'
export interface SlotLockDTO {
  doctorId: string;               
  slotId: string;         
  status?: 'locked' | 'confirmed' | 'expired'; 
}


export type  Weekdays= 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';

export interface RecurringDTO {
  _id?: string;  
  doctorId?:string|DoctorDTO
  startDate: Date;
  endDate: Date;
  frequency: "WEEKLY"|"DAILY";
  interval:number
  daysOfWeek: Weekdays[];
  starttime: string;
  endttime:string
}

export interface ScheduleDTO {
  _id: string;
  recurringSlotId?: string;
  doctorId?: string;
  date?: string; 
  startingTime?: string;
  endTime?: string;
  status?: string;
}


export interface AppointmentDTO  {
  _id: string;
  user_id?: string;
  doctor_id?: string;
  schedule_id?: string;
  patient_name: string;
  patient_email: string;
  patient_age: number;
  patient_gender: string;
  reason: string;
  status: string;
  payment_status: string;
  reportAdded: boolean;
  schedule: ScheduleDTO;
  followup_id?:string|AppointmentDTO
  followup_status?:boolean
   rescheduled_to?: string| AppointmentDTO ,
  isRescheduled?:boolean;

}


