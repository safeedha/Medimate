import { IAppointmentRepository  } from '../../../domain/repository/AppointmentRepository';
import { IGetDoctorAppointmentCount} from '../../../domain/useCaseInterface/appoinment/IGetDoctorAppointmentCount';
export class GetdoctorAppointmentCount implements IGetDoctorAppointmentCount{
  constructor(private _appointmentRepo:IAppointmentRepository) {}
   async getcountofappoinment(doctorid:string):Promise<Record<string, number>>{
       try{
          const result=await this._appointmentRepo.getcountofappoinmentofdoctor(doctorid)
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