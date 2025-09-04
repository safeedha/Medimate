import { IAppointmentRepository } from '../../../domain/repository/AppointmentRepository';
import {IGetAppointmentPagination } from '../../../domain/useCaseInterface/appoinment/IGetAppointmentPagination';

export class GetPage implements IGetAppointmentPagination{
  constructor(private appointmentRepo: IAppointmentRepository) {}

  async getpageforappoinment( id:string,originalId:string,limit:number):Promise<number> {
    try {
      const result = await this.appointmentRepo.getpageforuserId(id,originalId,limit)
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error in fetching appointment overview");
    }
  }
}