import {IReport} from '../entities/Report'
import { IMedicine } from '../entities/Report';
export interface IReportRepository {
  addReport(htmlcontent:string,appoinmentId:string,userId:string,medicine:IMedicine[]):Promise<string>
  getReport(appId:string):Promise<IReport>
}