import {DoctorRepository} from '../../../domain/repository/doctor-repository';
import {Idoctor} from '../../../domain/entities/doctor';

export class ChangeDocStatus {

  constructor(private docRepository: DoctorRepository) {}
  async changesatus(id:string): Promise<Idoctor[]> {
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