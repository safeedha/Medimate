import {Appointment} from  '../entities/appoinment';
 export interface appointmentRepository {
  createappoinment(data:Appointment):Promise<Appointment>;
   getfutureappoinment(userid:string):Promise<Appointment[]>
   getpastappoinment(userid:string):Promise<Appointment[]>
   changestatus(id:string,status:'pending' |  'cancelled' | 'completed'):Promise<Appointment>
   getappinmentbydoctor(doctorid:string):Promise<Appointment[]>
   getallappinmentfordoctor(doctorid:string):Promise<Appointment[]>
 }