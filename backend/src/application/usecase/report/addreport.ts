import { IReportRepository } from '../../../domain/repository/ReportRepository';
import { IAddReport } from '../../../domain/useCaseInterface/report/IAddReport';
import { IMedicine } from '../../../domain/entities/Report';
export class Addreport implements IAddReport{
constructor(private repoeportRepository:IReportRepository)
{

}
async addReport(htmlcontent:string,appoinmentId:string,userId:string,medicine:IMedicine[]):Promise<string>{
try{
  const report=await this.repoeportRepository.addReport(htmlcontent,appoinmentId,userId,medicine)
  return report
}
catch(error)
{
  console.log(error)
 throw new Error('Could not save report');
}
}
}