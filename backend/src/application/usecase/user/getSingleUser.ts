import {UserRepository} from '../../../domain/repository/user-repository';
import {UserDTO} from '../../../dto/user.dto'
import { IGetSingleUser } from '../../../domain/useCaseInterface/user/IGetSingleUser';
export class GetsingleUser implements IGetSingleUser{

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