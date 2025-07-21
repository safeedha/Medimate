import {UserRepository} from '../../../domain/repository/user-repository';
import {UserDTO} from '../../../dto/user.dto'
import { IGetUser } from '../../../domain/useCaseInterface/user/IGetUser';
export class GetUser implements IGetUser{

  constructor(private userRepository: UserRepository) {}
  async getAllUser(page:number,limit:number,search:string): Promise<{ users: UserDTO[]; total: number }> {
    try {
      const users = await this.userRepository.getAlluser(page,limit,search);
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