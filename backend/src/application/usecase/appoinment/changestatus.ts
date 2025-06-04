import { appointmentRepository  } from '../../../domain/repository/appoinment-rep';
import { slotRepository } from '../../../domain/repository/slot-repository';
import { Appointment } from '../../../domain/entities/appoinment';
export class ChangestatusAppointment {
  constructor(private appointmentRepo: appointmentRepository,private slotRepository:slotRepository) {}
   async changestus(appoinmentid:string,status: 'pending' |  'cancelled' | 'completed'):Promise<{message:string}>{
       try{
           const result=await this.appointmentRepo.changestatus(appoinmentid,status)
           const slotId=result.schedule_id
          if (typeof slotId === 'string' && status=='cancelled') {
          const result = await this.slotRepository.changeStatus(slotId);
        } else {
          // Handle the case where slotId is an IndividualSlot
          console.error('slotId is not a string');
        }
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