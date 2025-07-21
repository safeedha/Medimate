import { appointmentRepository } from '../../../domain/repository/appoinment-rep';
import {AppointmentCountByDate} from '../../../dto/slot.dto'
import {IGetFilterAppointments} from '../../../domain/useCaseInterface/appoinment/IGetFilterAppointments';

export class GetFilterfordoc implements IGetFilterAppointments{
  constructor(private appointmentRepo: appointmentRepository) {}

  async getappoinmentrange( status: 'completed' | 'cancelled' | 'pending',start: Date,end: Date,id:string):Promise<AppointmentCountByDate[]> {
    try {
      const result = await this.appointmentRepo.getfilteredapooinmentfordoc(status,start,end,id);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error in fetching appointment overview");
    }
  }
}