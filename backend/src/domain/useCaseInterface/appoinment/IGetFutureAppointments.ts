import { Appointment } from '../../../domain/entities/appoinment';

export interface IGetFutureAppointments {
  getfutureappoinment(
    userId: string,
    page: number,
    limit: number
  ): Promise<{total:number,appoi:Appointment[]}>;
}