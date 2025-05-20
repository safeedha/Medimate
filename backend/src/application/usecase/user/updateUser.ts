import {UserRepository} from '../../../doamin/repository/user-repository';
import {Iuser} from '../../../doamin/entities/user';

export class updatesingleUser {

  constructor(private userRepository: UserRepository) {}
  async updatesingleUser(id:string,firstname:string,lastname:string,phone:string,age:number,gender:"male"|"female"|"other"): Promise<Iuser> {
    try {
      const user = await this.userRepository.updatesingleuser(id,firstname,lastname,phone,age,gender);
   
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