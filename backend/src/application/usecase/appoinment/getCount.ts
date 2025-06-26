import { appointmentRepository  } from '../../../domain/repository/appoinment-rep';
import { Appointment } from '../../../domain/entities/appoinment';
export class GetdoctorAppointmentCount {
  constructor(private appointmentRepo: appointmentRepository,) {}
   async getcountofappoinment(doctorid:string):Promise<Record<string, number>>{
       try{
          const result=await this.appointmentRepo.getcountofappoinmentofdoctor(doctorid)
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