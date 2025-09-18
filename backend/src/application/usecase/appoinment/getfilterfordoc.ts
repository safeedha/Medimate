import { IAppointmentRepository } from '../../../domain/repository/AppointmentRepository';
import {AppointmentCountByDate}  from  '../../../domain/entities/Appoinment';
import {IGetFilterAppointments} from '../../../domain/useCaseInterface/appoinment/IGetFilterAppointments';

export class GetFilterfordoc implements IGetFilterAppointments{
  constructor(private _appointmentRepo: IAppointmentRepository) {}

  async getappoinmentrange( status: 'completed' | 'cancelled' | 'pending',start: Date,end: Date,id:string):Promise<AppointmentCountByDate[]> {
    try {
      const result = await this._appointmentRepo.getfilteredapooinmentfordoc(status,start,end,id);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error in fetching appointment overview");
    }
  }
}