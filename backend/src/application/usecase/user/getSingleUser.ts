import {UserRepository} from '../../../domain/repository/user-repository';
import {Iuser} from '../../../domain/entities/user';

export class GetsingleUser {

  constructor(private userRepository: UserRepository) {}
  async getsingleUser(id:string): Promise<Iuser> {
    try {
      const user = await this.userRepository.getsingleuser(id);
      console.log("user",user)
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