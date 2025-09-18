import {IAppointmentRepository } from '../../../domain/repository/AppointmentRepository';
import{IGetCountOfAppointmentsForDoctor } from '../../../domain/useCaseInterface/appoinment/IGetCountOfAppointmentsForDoctor';
export class GetAppointmentsPerDoctor implements IGetCountOfAppointmentsForDoctor{
  constructor(private _appointmentRepo: IAppointmentRepository) {}

  async getcount(status:'completed'|'pending'|'cancelled'): Promise<Record<string, number>> {
    try {
      const result = await this._appointmentRepo.getcountofappoinmentforeacdoc(status);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error in fetching appointment overview");
    }
  }
}