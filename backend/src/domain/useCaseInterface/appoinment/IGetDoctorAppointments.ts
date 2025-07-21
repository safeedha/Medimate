import {AppointmentDTO} from '../../../dto/slot.dto'
export interface IGetDoctorAppointments {
  getallappoinment(doctorId: string, page: number, limit: number): Promise<{ total: number; appointments: AppointmentDTO[] }>;
}