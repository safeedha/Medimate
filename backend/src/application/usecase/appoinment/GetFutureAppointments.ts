import { IAppointmentRepository  } from '../../../domain/repository/AppointmentRepository';
import {IGetFutureAppointments } from '../../../domain/useCaseInterface/appoinment/IGetFutureAppointments';
import { Appointment } from '../../../domain/entities/Appoinment';
export class GetfutureAppointment implements IGetFutureAppointments{
  constructor(private _appointmentRepo: IAppointmentRepository) {}
   async getfutureappoinment(userid:string,page:number,limit:number):Promise<{total:number,appoi:Appointment[]}>{
       try{
           const result=await this._appointmentRepo.getfutureappoinment(userid,page,limit)
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