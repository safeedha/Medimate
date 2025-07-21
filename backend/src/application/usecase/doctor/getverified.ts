
import {DoctorRepository} from '../../../domain/repository/doctor-repository';
import {DoctorDTO} from '../../../dto/doctor.dto'
import {IGetVerifiedDoctors} from "../../../domain/useCaseInterface/doctor/IGetVerifiedDoctors"

export class FetchVerifiedDoctor implements IGetVerifiedDoctors{

  constructor(private doctorRepository: DoctorRepository) {}
  async getAllVerifiedDoctors(page:number,limit:number,department?: string,search?:string,experience?:string): Promise<{ total: number; data: DoctorDTO[] }> {
    try {
      const unverifiedDoctors = await this.doctorRepository.getAllverified(page,limit,department,search,experience);
      return unverifiedDoctors;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

 
  }
}