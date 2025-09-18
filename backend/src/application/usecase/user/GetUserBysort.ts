import {IUserRepository} from '../../../domain/repository/UserRepository';
import {UserDTO} from '../../../dto/user.dto'
import { IGetAllSortedUsers } from '../../../domain/useCaseInterface/user/IGetAllSortedUsers';

export class GetUserBysort implements IGetAllSortedUsers{

  constructor(private _userRepository: IUserRepository) {}
  async getAllSortUser(search:string): Promise<{ users: UserDTO[]; total: number }> {
    try {
      const {users} = await this._userRepository.getAlluserbysort(search);
        const user: UserDTO[] = users.map(doc => ({
      _id: doc._id!.toString(),
      firstname: doc.firstname,
      lastname: doc.lastname,
      email: doc.email,
      phone: doc.phone ?? null,
      isBlocked: doc.isBlocked,
      gender: doc.gender,
      age: doc.age,
    }));
      return {users:user,total:users.length}
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

 
  }
}