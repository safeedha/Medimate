
import { ReportDto } from '../../../dto/report.dto';
export interface IGetAppointmentReport {
  getreport(appointmentId: string): Promise< ReportDto>;
}