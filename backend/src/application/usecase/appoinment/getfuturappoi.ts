import { appointmentRepository  } from '../../../domain/repository/appoinment-rep';
import { slotRepository } from '../../../domain/repository/slot-repository';
import { Appointment } from '../../../domain/entities/appoinment';
export class GetfutureAppointment {
  constructor(private appointmentRepo: appointmentRepository,) {}
   async getfutureappoinment(userid:string):Promise<Appointment[]>{
       try{
           const result=await this.appointmentRepo.getfutureappoinment(userid)
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