
import { IBaseRepository } from '../../../domain/repository/BaseRepository'
import { Appointment } from '../../../domain/entities/Appoinment';
import {IGetSingleAppointment} from '../../../domain/useCaseInterface/appoinment/IGetSingleAppointment';
export class GetSingleappoinment implements IGetSingleAppointment{
  constructor(private  _baseRepository: IBaseRepository<Appointment>) {}
   async getsingleappoinment(id:string):Promise<Appointment>{
       try{
          const result=await this._baseRepository.findById(id)
          if(!result)
          {
              throw new Error("Failed to fetch single appointment");
          }
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