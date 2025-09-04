import { Appointment } from './Appoinment';
import { Iuser } from './User';
export interface IMedicine {
  name: string
  dosage: string
  frequency: string
  duration: string
  notes?: string|null
}
export interface IReport {
  content: string;
  appointmentId: string|Appointment;
  userId: string|Iuser;
  createdAt?: Date; 
  medicine:IMedicine[]
}