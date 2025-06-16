import {UserRepository} from '../../../domain/repository/user-repository';
import {UserDTO} from '../../../dto/user.dto'

export class GetsingleUser {

  constructor(private userRepository: UserRepository) {}
  async getsingleUser(id:string): Promise<UserDTO> {
    try {
      const user = await this.userRepository.getsingleuser(id);
    
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

 
  }
}