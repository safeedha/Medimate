import { appointmentRepository  } from '../../../domain/repository/appoinment-rep';
import { slotRepository } from '../../../domain/repository/slot-repository';
import { Appointment } from '../../../domain/entities/appoinment';
export class GetdoctorAppointmentByid {
  constructor(private appointmentRepo: appointmentRepository) {}
   async getallappoinment(doctorid:string):Promise<Appointment[]>{
       try{
          const result=await this.appointmentRepo.getallappinmentfordoctor(doctorid)
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