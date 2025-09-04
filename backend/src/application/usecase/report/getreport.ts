import { IReportRepository } from '../../../domain/repository/ReportRepository';
import { ReportDto, MedicineDto } from '../../../dto/report.dto';
import { IGetAppointmentReport } from '../../../domain/useCaseInterface/report/IGetAppointmentReport';
import { IReport } from '../../../domain/entities/Report';

export class Getreport implements IGetAppointmentReport {
  constructor(private repoeportRepository: IReportRepository) {}

  async getreport(appId: string): Promise<ReportDto> {
    try {
      const report: IReport = await this.repoeportRepository.getReport(appId);

      const dto: ReportDto = {
        content: report.content,
        medicine: report.medicine.map((med): MedicineDto => ({
          name: med.name,
          dosage: med.dosage,
          frequency: med.frequency,
          duration: med.duration,
          notes: med.notes ?? null,
        })),
      };

      return dto;
    } catch (error) {
      console.log(error)
      throw new Error('Could not fetch report');
    }
  }
}
