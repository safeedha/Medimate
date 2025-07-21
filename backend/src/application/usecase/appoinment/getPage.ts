import { appointmentRepository } from '../../../domain/repository/appoinment-rep';
import {IGetAppointmentPagination} from '../../../domain/useCaseInterface/appoinment/IGetAppointmentPagination';


export class GetPage implements IGetAppointmentPagination{
  constructor(private appointmentRepo: appointmentRepository) {}

  async getpageforappoinment( id:string,originalId:string,limit:number):Promise<number> {
    try {
      const result = await this.appointmentRepo.getpageforId(id,originalId,limit)
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error in fetching appointment overview");
    }
  }
}