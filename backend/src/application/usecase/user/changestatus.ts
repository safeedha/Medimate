import {UserRepository} from '../../../domain/repository/user-repository';
import {UserDTO} from '../../../dto/user.dto'

export class ChangeStatus {

  constructor(private userRepository: UserRepository) {}
  async changesatus(id:string): Promise<UserDTO[]> {
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