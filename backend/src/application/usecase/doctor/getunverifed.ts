
import {DoctorRepository} from '../../../domain/repository/doctor-repository';
import {DoctorDTO} from '../../../dto/doctor.dto'
export class GetUnverified {

  constructor(private doctorRepository: DoctorRepository) {}
  async getAllUnverifiedDoctors(page:number,limit:number): Promise<{ doctors: DoctorDTO[]; total: number }> {
    try {
      const unverifiedDoctors = await this.doctorRepository.getAllunverified(page,limit);
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