import {IUser} from '../../../domain/entities/User';
import {UserDTO} from '../../../dto/user.dto'
import { IGetSingleUser } from '../../../domain/useCaseInterface/user/IGetSingleUser';
import { IBaseRepository } from '../../../domain/repository/BaseRepository'
export class GetsingleUser implements IGetSingleUser{

  constructor(private _baseRepository: IBaseRepository<IUser>) {}
  async getsingleUser(id:string): Promise<UserDTO> {
    try {
      const user = await this._baseRepository.findById(id);
      if(!user)
      {
        throw new Error("error during fetching single user")
      }
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