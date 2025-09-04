import {IUserRepository} from '../../../domain/repository/UserRepository';
import {UserDTO} from '../../../dto/user.dto'
import { IGetSingleUser } from '../../../domain/useCaseInterface/user/IGetSingleUser';
export class GetsingleUser implements IGetSingleUser{

  constructor(private userRepository: IUserRepository) {}
  async getsingleUser(id:string): Promise<UserDTO> {
    try {
      const user = await this.userRepository.getsingleuser(id);
       const userDTO: UserDTO = {
            id: user._id!.toString(),
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            age: user.age,
          };
      return userDTO;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

 
  }
}