import {IAppointmentRepository } from '../../../domain/repository/AppointmentRepository';
import {Appointment} from '../../../domain/entities/Appoinment';
import {IGetDoctorAppointments} from '../../../domain/useCaseInterface/appoinment/IGetDoctorAppointments'; 
export class GetdoctorAppointment implements IGetDoctorAppointments{
  constructor(private _appointmentRepo: IAppointmentRepository) {}
   async getallappoinment(doctorid:string,page:number,limit:number):Promise<{ total: number; appointments: Appointment[] }>{
       try{
           const result=await this._appointmentRepo.getappinmentbydoctor(doctorid,page,limit)
          return result
       }
       catch(error)
       {
         if (error instanceof Error)
         {
          throw Error(error.message)
         }
         throw Error("error in fetching")
       }
   }
}