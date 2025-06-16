import { appointmentRepository  } from '../../../domain/repository/appoinment-rep';
import { slotRepository } from '../../../domain/repository/slot-repository';
import { Appointment } from '../../../domain/entities/appoinment';
export class ChangestatusAppointment {
  constructor(private appointmentRepo: appointmentRepository,private slotRepository:slotRepository) {}
   async changestus(appoinmentid:string,status: 'pending' |  'cancelled' | 'completed'):Promise<{message:string}>{
       try{
           const result=await this.appointmentRepo.changestatus(appoinmentid,status)
            const slotId = result.schedule_id?.toString();
           const r= await this.slotRepository.changeStatus(slotId);
      

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