import {AppointmentCountByDate} from '../../../domain/entities/Appoinment';
export interface IGetFilteredAppointment {
  getappoinmentrange(
    status: 'completed' | 'cancelled' | 'pending',
    start: Date,
    end: Date
  ): Promise<AppointmentCountByDate[]>;
}