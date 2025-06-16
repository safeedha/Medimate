import {DoctorRepository} from '../../../domain/repository/doctor-repository';
import {DoctorDTO} from '../../../dto/doctor.dto'

export class GetSingledoc {

  constructor(private doctorRepository: DoctorRepository) {}
  async getsingledoc(id:string):Promise<DoctorDTO>{
    try{
         const doctor=await this.doctorRepository.getSingleDoctor(id)
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