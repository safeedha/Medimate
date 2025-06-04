import { Appointment } from '../../domain/entities/appoinment';
import { Iuser } from '../../domain/entities/user';
export interface IReport {
  content: string;
  appointmentId: string|Appointment;
  userId: string|Iuser;
  createdAt?: Date; // Optional because Mongoose adds it automatically
}