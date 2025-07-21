import {IReport} from '../entities/report'
import { IMedicine } from '../../domain/entities/report';
export interface ReportRepository {
  addReport(htmlcontent:string,appoinmentId:string,userId:string,medicine:IMedicine[]):Promise<string>
  getReport(appId:string):Promise<IReport>
}