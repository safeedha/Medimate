
import { IUpdateUser } from '../../../domain/useCaseInterface/user/IUpdateUser';
import { IBaseRepository } from '../../../domain/repository/BaseRepository'
import {IUser} from '../../../domain/entities/User';
export class UpdatesingleUser implements IUpdateUser{

  constructor(private _baseRepository: IBaseRepository<IUser>) {}
  async updatesingleUser(id:string,firstname:string,lastname:string,phone:string,age:number,gender:"male"|"female"|"other"): Promise<string> {
    try {
      const user = await this. _baseRepository.update(id,{firstname,lastname,phone,age,gender});
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