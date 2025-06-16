
import {DoctorRepository} from '../../../domain/repository/doctor-repository';
import {DoctorDTO} from '../../../dto/doctor.dto'

export class Getverified {

  constructor(private doctorRepository: DoctorRepository) {}
  async getAllVerifiedDoctors(page:number,limit:number,department?: string,search?:string): Promise<{ total: number; data: DoctorDTO[] }> {
    try {
      const unverifiedDoctors = await this.doctorRepository.getAllverified(page,limit,department,search);
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