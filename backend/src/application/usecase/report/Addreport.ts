import { IBaseRepository } from '../../../domain/repository/BaseRepository'
import { IAddReport } from '../../../domain/useCaseInterface/report/IAddReport';
import { IMedicine } from '../../../domain/entities/Report';
import {IReport} from '../../../domain/entities/Report'
export class Addreport implements IAddReport{
constructor(private _baseRepository:IBaseRepository<IReport> )
{

}
async addReport(htmlcontent:string,appoinmentId:string,userId:string,medicine:IMedicine[]):Promise<string>{
try{
  const report=await this._baseRepository.create({content:htmlcontent,appointmentId:appoinmentId,userId,medicine})
  return "report created"
}
catch(error)
{
  console.log(error)
 throw new Error('Could not save report');
}
}
}