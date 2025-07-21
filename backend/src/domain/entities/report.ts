import { Appointment } from '../../domain/entities/appoinment';
import { Iuser } from '../../domain/entities/user';
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