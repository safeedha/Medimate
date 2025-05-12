
import {DoctorRepository} from '../../../doamin/repository/doctor-repository';
import {Idoctor} from '../../../doamin/entities/doctor';

export class Getverified {

  constructor(private doctorRepository: DoctorRepository) {}
  async getAllVerifiedDoctors(): Promise<Idoctor[]> {
    try {
      const unverifiedDoctors = await this.doctorRepository.getAllverified();
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