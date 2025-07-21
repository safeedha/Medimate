import { ReportRepository } from '../../../domain/repository/report-rep';
import { IAddReport } from '../../../domain/useCaseInterface/report/IAddReport';
import { IMedicine } from '../../../domain/entities/report';
export class Addreport implements IAddReport{
constructor(private repoeportRepository:ReportRepository)
{

}
async addReport(htmlcontent:string,appoinmentId:string,userId:string,medicine:IMedicine[]):Promise<string>{
try{
  const report=await this.repoeportRepository.addReport(htmlcontent,appoinmentId,userId,medicine)
  return report
}
catch(error)
{
 throw new Error('Could not save report');
}
}
}