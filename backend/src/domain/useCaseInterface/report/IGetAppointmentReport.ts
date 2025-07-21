import {IReport} from '../../../domain/entities/report'
export interface IGetAppointmentReport {
  getreport(appointmentId: string): Promise<IReport>;
}