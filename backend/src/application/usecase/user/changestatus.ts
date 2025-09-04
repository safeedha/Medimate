import {IUserRepository} from '../../../domain/repository/UserRepository';
import { IChangeStatus } from '../../../domain/useCaseInterface/user/IChangeStatus';
export class ChangeStatus implements IChangeStatus {

  constructor(private userRepository: IUserRepository) {}
  async changesatus(id:string): Promise<string> {
    try {
      const users = await this.userRepository.changeStatus(id);
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