import {DoctorRepository} from '../../../domain/repository/doctor-repository';
import { DoctorDTO } from '../../../dto/doctor.dto';
import { IChangeDocStatus } from '../../../domain/useCaseInterface/doctor/IChangeDocStatus';
export class ChangeDocStatus implements IChangeDocStatus{

  constructor(private docRepository: DoctorRepository) {}
  async changesatus(id:string): Promise<DoctorDTO[]> {
    try {
      const users = await this.docRepository.changeStatus(id);
      return users;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

 
  }
}