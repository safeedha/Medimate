import { appointmentRepository } from '../../../domain/repository/appoinment-rep';
import{IGetCountOfAppointmentsForDoctor } from '../../../domain/useCaseInterface/appoinment/IGetCountOfAppointmentsForDoctor';
export class GetCountofappforeachDoc implements IGetCountOfAppointmentsForDoctor{
  constructor(private appointmentRepo: appointmentRepository) {}

  async getcount(status:'completed'|'pending'|'cancelled'): Promise<Record<string, number>> {
    try {
      const result = await this.appointmentRepo.getcountofappoinmentforeacdoc(status);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error in fetching appointment overview");
    }
  }
}