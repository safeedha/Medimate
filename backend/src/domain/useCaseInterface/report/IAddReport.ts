import { IMedicine } from '../../entities/Report';
export interface IAddReport {
  addReport(
    htmlcontent: string,
    appointmentId: string,
    userId: string,
    medicine:IMedicine[]
  ): Promise<string>;
}