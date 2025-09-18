
import { IBaseRepository } from '../../../domain/repository/BaseRepository'
import { IChangeDocStatus } from '../../../domain/useCaseInterface/doctor/IChangeDocStatus';
import {IDoctor} from '../../../domain/entities/Doctor'
export class ChangeDocStatus implements IChangeDocStatus{

  constructor(private _baseRepository: IBaseRepository<IDoctor>) {}
  async changesatus(id:string): Promise<string> {
    try {
      const users = await this._baseRepository.delete(id);
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