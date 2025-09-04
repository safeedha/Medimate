import {Appointment,AppointmentCountByDate} from  '../entities/Appoinment';
import {AppointmentDTO} from '../../dto/slot.dto'
import {IDepartmentSummary} from '../../dto/departmentsummary.dto'
 export interface IAppointmentRepository {
  createappoinment(data:Appointment):Promise<Appointment>;
   getfutureappoinment(userid:string,page:number,limt:number):Promise<{total:number,appoi:Appointment[]}>
   getpastappoinment(userid:string):Promise<Appointment[]>
   changestatus(id:string,status:'pending' |  'cancelled' | 'completed'):Promise<Appointment>
   getappinmentbydoctor(doctorid:string,page:number,limit:number):Promise<{ total: number; appointments: AppointmentDTO[] }>
   getallappinmentfordoctor(doctorid:string):Promise<Appointment[]>
   getsingleappoinment(id:string):Promise<Appointment>
   rescheduleStatus(id:string,resheduleid:string):Promise<Appointment>
   getdetails():Promise<{total:number,pending:number,completed:number,cancelled:number}>
   getcountofappoinmentforeacdoc(status:'completed'|'pending'|'cancelled'):Promise<Record<string, number>>
   getfilteredapooinment(status: 'completed' | 'cancelled' | 'pending',start: Date,end: Date):Promise<AppointmentCountByDate[]>
   getfilteredapooinmentfordoc(status: 'completed' | 'cancelled' | 'pending',start: Date,end: Date,id:string):Promise<AppointmentCountByDate[]>
   getcountofappoinmentofdoctor(id:string):Promise<Record<string, number>>
   createfollowp(appoinmentId:string,followupid:string):Promise<string>
   getpageforId( id:string,originalId:string,limit:number):Promise<number>
   getpageforuserId( id:string,originalId:string,limit:number):Promise<number>
   getdepartmentsummary():Promise<IDepartmentSummary[]>
 }