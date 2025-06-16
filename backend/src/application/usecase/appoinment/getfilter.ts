import { appointmentRepository } from '../../../domain/repository/appoinment-rep';
import {AppointmentCountByDate} from '../../../dto/slot.dto'

export class GetFilter {
  constructor(private appointmentRepo: appointmentRepository) {}

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