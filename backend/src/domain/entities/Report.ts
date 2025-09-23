import { Appointment } from './Appoinment';
import { IUser } from './User';
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
  userId: string|IUser;
  createdAt?: Date; 
  medicine:IMedicine[]
}