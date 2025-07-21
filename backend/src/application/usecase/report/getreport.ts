import { ReportRepository } from '../../../domain/repository/report-rep';
import {IReport} from '../../../domain/entities/report'
import {IGetAppointmentReport } from '../../../domain/useCaseInterface/report/IGetAppointmentReport';

export class Getreport implements IGetAppointmentReport{
constructor(private repoeportRepository:ReportRepository)
{

}
async getreport(appId:string):Promise<IReport>{
try{
  const report=await this.repoeportRepository.getReport(appId)
  return report
}
catch(error)
{
 throw new Error('Could not save report');
}
}
}