import { appointmentRepository  } from '../../../domain/repository/appoinment-rep';
import { slotRepository } from '../../../domain/repository/slot-repository';
import {AppointmentDTO} from '../../../dto/slot.dto'
export class GetdoctorAppointment {
  constructor(private appointmentRepo: appointmentRepository,) {}
   async getallappoinment(doctorid:string,page:number,limit:number):Promise<{ total: number; appointments: AppointmentDTO[] }>{
       try{
           const result=await this.appointmentRepo.getappinmentbydoctor(doctorid,page,limit)
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