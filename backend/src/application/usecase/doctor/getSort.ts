
import {DoctorRepository} from '../../../domain/repository/doctor-repository';
import {DoctorDTO} from '../../../dto/doctor.dto'
import {IGetSortedDoctors} from "../../../domain/useCaseInterface/doctor/IGetSortedDoctors"

export class FetchSortedDoctors implements IGetSortedDoctors {
  constructor(private doctorRepository: DoctorRepository) {}

  async getAllDoctors(search: string): Promise<{ data: DoctorDTO[]; total: number }> {
    try {
      const result = await this.doctorRepository.getAllverifiedbysort(search);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}