import {IReport} from '../entities/report'
export interface ReportRepository {
  addReport(htmlcontent:string,appoinmentId:string,userId:string):Promise<string>
  getReport(appId:string):Promise<IReport>
}