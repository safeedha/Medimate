import { appointmentRepository  } from '../../../domain/repository/appoinment-rep';
import { Appointment } from '../../../domain/entities/appoinment';
export class GetSingleappoinment {
  constructor(private appointmentRepo: appointmentRepository,) {}
   async getsingleappoinment(id:string):Promise<Appointment>{
       try{
          const result=await this.appointmentRepo.getsingleappoinment(id)
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