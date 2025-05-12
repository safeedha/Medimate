import {UserRepository} from '../../../doamin/repository/user-repository';
import {Iuser} from '../../../doamin/entities/user';

export class ChangeStatus {

  constructor(private userRepository: UserRepository) {}
  async changesatus(id:string): Promise<Iuser[]> {
    try {
      const users = await this.userRepository.changeStatus(id);
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