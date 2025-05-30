
import {DoctorRepository} from '../../../domain/repository/doctor-repository';
import {Idoctor} from '../../../domain/entities/doctor';

export class Getverified {

  constructor(private doctorRepository: DoctorRepository) {}
  async getAllVerifiedDoctors(department?: string,search?:string): Promise<Idoctor[]> {
    try {
      const unverifiedDoctors = await this.doctorRepository.getAllverified(department,search);
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