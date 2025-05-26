import { appointmentRepository  } from '../../../domain/repository/appoinment-rep';
import { slotRepository } from '../../../domain/repository/slot-repository';
import { Appointment } from '../../../domain/entities/appoinment';
export class ChangestatusAppointment {
  constructor(private appointmentRepo: appointmentRepository,) {}
   async changestus(appoinmentid:string):Promise<{message:string}>{
       try{
          const status: 'pending' |  'cancelled' | 'completed'= 'cancelled';
           const result=await this.appointmentRepo.changestatus(appoinmentid,status)
          return {message:"Status updated"}
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