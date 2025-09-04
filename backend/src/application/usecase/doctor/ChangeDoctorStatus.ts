import {IDoctorRepository} from '../../../domain/repository/DoctorRepository';

import { IChangeDocStatus } from '../../../domain/useCaseInterface/doctor/IChangeDocStatus';
export class ChangeDocStatus implements IChangeDocStatus{

  constructor(private docRepository: IDoctorRepository) {}
  async changesatus(id:string): Promise<string> {
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