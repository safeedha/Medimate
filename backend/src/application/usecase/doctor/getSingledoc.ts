import {DoctorRepository} from '../../../domain/repository/doctor-repository';
import {DoctorDTO} from '../../../dto/doctor.dto'
import {IGetSingleDoctor} from "../../../domain/useCaseInterface/doctor/IGetSingleDoctor"

export class FetchSingleDoctor implements IGetSingleDoctor {

  constructor(private doctorRepository: DoctorRepository) {}
  async getsingledoc(id:string):Promise<DoctorDTO>{
    try{
       console.log("kooibb")
         const doctor=await this.doctorRepository.getSingleDoctor(id)
         console.log("hoikooi")
         return doctor
    }
    catch(error)
    {
      if(error instanceof Error)
      {
        throw Error(error.message)
      }
      else{
        throw Error("Some error")
      }
    }
  }

}