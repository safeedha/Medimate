import { Appointment } from '../../entities/Appoinment';
export interface IGetSingleAppointment {
  getsingleappoinment(appointmentId: string): Promise<Appointment>;
}