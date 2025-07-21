import { Appointment } from '../../../domain/entities/appoinment';
export interface IGetSingleAppointment {
  getsingleappoinment(appointmentId: string): Promise<Appointment>;
}