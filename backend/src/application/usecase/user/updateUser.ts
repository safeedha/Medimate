import {UserRepository} from '../../../domain/repository/user-repository';
import {UserDTO} from '../../../dto/user.dto'

export class updatesingleUser {

  constructor(private userRepository: UserRepository) {}
  async updatesingleUser(id:string,firstname:string,lastname:string,phone:string,age:number,gender:"male"|"female"|"other"): Promise<string> {
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