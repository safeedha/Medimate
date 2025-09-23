import { IAppointmentRepository  } from '../../../domain/repository/AppointmentRepository';
import { Appointment } from '../../../domain/entities/Appoinment';
export class GetdoctorAppointmentByid {
  constructor(private _appointmentRepo: IAppointmentRepository ) {}
   async getallappoinment(doctorid:string):Promise<Appointment[]>{
       try{
          const result=await this._appointmentRepo.getallappinmentfordoctor(doctorid)
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