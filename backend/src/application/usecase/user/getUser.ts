import {IUserRepository} from '../../../domain/repository/UserRepository';
import {UserDTO} from '../../../dto/user.dto'
import { IGetUser } from '../../../domain/useCaseInterface/user/IGetUser';
export class GetUser implements IGetUser{

  constructor(private userRepository: IUserRepository) {}
  async getAllUser(page:number,limit:number,search:string): Promise<{ users: UserDTO[]; total: number }> {
    try {
      const {users} = await this.userRepository.getAlluser(page,limit,search);
       const user: UserDTO[] = users.map(doc => ({
        _id: doc._id!.toString() ,
        firstname: doc.firstname,
        lastname: doc.lastname,
        email: doc.email,
        phone: doc.phone ?? null,
        isBlocked: doc.isBlocked,
        gender: doc.gender,
        age: doc.age,
      }));
      return {users:user,total:user.length}
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

 
  }
}