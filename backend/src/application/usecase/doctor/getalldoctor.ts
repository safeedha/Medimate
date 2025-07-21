
import {DoctorRepository} from '../../../domain/repository/doctor-repository';
import {DoctorDTO} from '../../../dto/doctor.dto'
import { IGetAllDoctor } from '../../../domain/useCaseInterface/doctor/IGetAllDoctor';

export class GetAlldoctor implements IGetAllDoctor{

  constructor(private doctorRepository: DoctorRepository) {}
  async getAlldoctors(page:number,limit:number,search:string): Promise<{doctors:DoctorDTO[],total:number}> {
    try {
      const result = await this.doctorRepository.getAlldoctor(page,limit,search);
      return result
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

 
  }
}