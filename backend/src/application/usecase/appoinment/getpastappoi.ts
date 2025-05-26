import { appointmentRepository  } from '../../../domain/repository/appoinment-rep';
import { slotRepository } from '../../../domain/repository/slot-repository';
import { Appointment } from '../../../domain/entities/appoinment';
export class GetpastAppointment {
  constructor(private appointmentRepo: appointmentRepository ) {}
   async getpastappoinment(userid:string):Promise<Appointment[]>{
        try{
          const result=await this.appointmentRepo.getpastappoinment(userid)
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