import {IAppointmentRepository } from '../../../domain/repository/AppointmentRepository';
import {AppointmentCountByDate} from '../../../domain/entities/Appoinment';
import{IGetFilteredAppointment } from '../../../domain/useCaseInterface/appoinment/IGetFilteredAppointment';

export class GetFilter implements IGetFilteredAppointment{
  constructor(private appointmentRepo: IAppointmentRepository) {}

  async getappoinmentrange( status: 'completed' | 'cancelled' | 'pending',start: Date,end: Date):Promise<AppointmentCountByDate[]> {
    try {
      const result = await this.appointmentRepo.getfilteredapooinment(status,start,end);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error in fetching appointment overview");
    }
  }
}