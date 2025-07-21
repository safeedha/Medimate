import {AppointmentCountByDate} from '../../../dto/slot.dto'

export interface IGetFilteredAppointment {
  getappoinmentrange(
    status: 'completed' | 'cancelled' | 'pending',
    start: Date,
    end: Date
  ): Promise<AppointmentCountByDate[]>;
}