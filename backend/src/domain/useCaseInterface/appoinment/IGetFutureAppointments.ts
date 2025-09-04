import { Appointment } from '../../entities/Appoinment';

export interface IGetFutureAppointments {
  getfutureappoinment(
    userId: string,
    page: number,
    limit: number
  ): Promise<{total:number,appoi:Appointment[]}>;
}