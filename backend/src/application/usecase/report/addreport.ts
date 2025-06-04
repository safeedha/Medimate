import { ReportRepository } from '../../../domain/repository/report-rep';

export class Addreport{
constructor(private repoeportRepository:ReportRepository)
{

}
async addReport(htmlcontent:string,appoinmentId:string,userId:string):Promise<string>{
try{
  const report=await this.repoeportRepository.addReport(htmlcontent,appoinmentId,userId)
  return report
}
catch(error)
{
 throw new Error('Could not save report');
}
}
}