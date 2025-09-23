import {AppointmentCountByDate} from '../../../domain/entities/Appoinment';
export interface IGetFilterAppointments {
  getappoinmentrange(
    status: 'pending' | 'cancelled' | 'completed',
    start: Date,
    end: Date,
    doctorId: string
  ): Promise<AppointmentCountByDate[]>;
}