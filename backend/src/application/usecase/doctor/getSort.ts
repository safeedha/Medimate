
import {DoctorRepository} from '../../../domain/repository/doctor-repository';
import {DoctorDTO} from '../../../dto/doctor.dto'

export class GetAllSort {

  constructor(private doctorRepository: DoctorRepository) {}
  async getAlldoctor(search:string): Promise<{data:DoctorDTO[],total:number}> {
    try {
      const result = await this.doctorRepository.getAllverifiedbysort(search);
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