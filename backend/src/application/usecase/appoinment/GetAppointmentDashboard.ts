import { IAppointmentRepository } from '../../../domain/repository/AppointmentRepository';
import{IGetDashboardAppointment} from '../../../domain/useCaseInterface/appoinment/IGetDashboardAppointment';

export class GetDashbordappoinment implements IGetDashboardAppointment{
  constructor(private _appointmentRepo: IAppointmentRepository) {}
  async getoverview(): Promise<{ total: number; pending: number; completed: number; cancelled: number }> {
    try {
      const result = await this._appointmentRepo.getdetails();
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error in fetching appointment overview");
    }
  }
}
