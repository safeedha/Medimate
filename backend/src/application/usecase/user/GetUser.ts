import {IUser} from '../../../domain/entities/User';
import {UserDTO} from '../../../dto/user.dto'
import { IGetUser } from '../../../domain/useCaseInterface/user/IGetUser';
import { IBaseRepository } from '../../../domain/repository/BaseRepository'
export class GetUser implements IGetUser{

  constructor(private _baseRepository: IBaseRepository<IUser>) {}
  async getAllUser(page:number,limit:number,search:string): Promise<{ users: UserDTO[]; total: number }> {
    try {
      const users = await this._baseRepository.findAll(page,limit,search);
       const total=await this._baseRepository.findcount( page,limit,search)
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
      return {users:user,total:total.data}
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

 
  }
}



