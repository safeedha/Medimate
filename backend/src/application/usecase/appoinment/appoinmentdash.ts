import { appointmentRepository } from '../../../domain/repository/appoinment-rep';
import{IGetDashboardAppointment} from '../../../domain/useCaseInterface/appoinment/IGetDashboardAppointment';
export class GetDashbordappoinment implements IGetDashboardAppointment{
  constructor(private appointmentRepo: appointmentRepository) {}
  async getoverview(): Promise<{ total: number; pending: number; completed: number; cancelled: number }> {
    try {
      const result = await this.appointmentRepo.getdetails();
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error in fetching appointment overview");
    }
  }
}
