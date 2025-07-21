import { IMedicine } from '../../../domain/entities/report';
export interface IAddReport {
  addReport(
    htmlcontent: string,
    appointmentId: string,
    userId: string,
    medicine:IMedicine[]
  ): Promise<string>;
}