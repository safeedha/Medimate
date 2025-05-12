import {UserRepository} from '../../../doamin/repository/user-repository';
import {Iuser} from '../../../doamin/entities/user';

export class GetUser {

  constructor(private userRepository: UserRepository) {}
  async getAllUser(): Promise<Iuser[]> {
    try {
      const users = await this.userRepository.getAlluser();
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