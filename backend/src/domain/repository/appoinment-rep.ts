import {Appointment} from  '../entities/appoinment';
import {ScheduleDTO,AppointmentDTO,AppointmentCountByDate} from '../../dto/slot.dto'
 export interface appointmentRepository {
  createappoinment(data:Appointment):Promise<Appointment>;
   getfutureappoinment(userid:string):Promise<Appointment[]>
   getpastappoinment(userid:string):Promise<Appointment[]>
   changestatus(id:string,status:'pending' |  'cancelled' | 'completed'):Promise<Appointment>
   getappinmentbydoctor(doctorid:string,page:number,limit:number):Promise<{ total: number; appointments: AppointmentDTO[] }>
   getallappinmentfordoctor(doctorid:string):Promise<Appointment[]>
   getsingleappoinment(id:string):Promise<Appointment>
   rescheduleStatus(id:string,resheduleid:string):Promise<Appointment>
   getdetails():Promise<{total:number,pending:number,completed:number,cancelled:number}>
   getcountofappoinmentforeacdoc():Promise<Record<string, number>>
   getfilteredapooinment(status: 'completed' | 'cancelled' | 'pending',start: Date,end: Date):Promise<AppointmentCountByDate[]>
 }