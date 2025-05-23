import {DoctorRepository} from '../../../domain/repository/doctor-repository';
import {Idoctor} from '../../../domain/entities/doctor';

export class GetSingledoc {

  constructor(private doctorRepository: DoctorRepository) {}
  async getsingledoc(id:string):Promise<Idoctor>{
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