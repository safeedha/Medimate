import {AppointmentCountByDate} from '../../../dto/slot.dto'
export interface IGetFilterAppointments {
  getappoinmentrange(
    status: 'pending' | 'cancelled' | 'completed',
    start: Date,
    end: Date,
    doctorId: string
  ): Promise<AppointmentCountByDate[]>;
}