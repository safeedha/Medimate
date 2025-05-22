
import {DoctorRepository} from '../../../domain/repository/doctor-repository';
import {Idoctor} from '../../../domain/entities/doctor';

export class GetUnverified {

  constructor(private doctorRepository: DoctorRepository) {}
  async getAllUnverifiedDoctors(): Promise<Idoctor[]> {
    try {
      const unverifiedDoctors = await this.doctorRepository.getAllunverified();
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