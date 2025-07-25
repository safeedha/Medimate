import { appointmentRepository  } from '../../../domain/repository/appoinment-rep';
import {IGetFutureAppointments } from '../../../domain/useCaseInterface/appoinment/IGetFutureAppointments';
import { Appointment } from '../../../domain/entities/appoinment';
export class GetfutureAppointment implements IGetFutureAppointments{
  constructor(private appointmentRepo: appointmentRepository,) {}
   async getfutureappoinment(userid:string,page:number,limit:number):Promise<{total:number,appoi:Appointment[]}>{
       try{
           const result=await this.appointmentRepo.getfutureappoinment(userid,page,limit)
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