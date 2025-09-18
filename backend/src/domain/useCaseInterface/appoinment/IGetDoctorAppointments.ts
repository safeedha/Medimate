import {Appointment} from '../../../domain/entities/Appoinment';
export interface IGetDoctorAppointments {
  getallappoinment(doctorId: string, page: number, limit: number): Promise<{ total: number; appointments: Appointment[] }>;
}