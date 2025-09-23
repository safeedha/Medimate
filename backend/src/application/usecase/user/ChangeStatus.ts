import {IUser} from '../../../domain/entities/User';
import { IChangeStatus } from '../../../domain/useCaseInterface/user/IChangeStatus';
import { IBaseRepository } from '../../../domain/repository/BaseRepository'
export class ChangeStatus implements IChangeStatus {

  constructor(private _baseRepository: IBaseRepository<IUser>) {}
  async changesatus(id:string): Promise<string> {
    try {
      const users = await this._baseRepository.delete(id);
      return users
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

 
  }
}