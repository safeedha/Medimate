import { RegRepository  } from "../../../doamin/repository/reg-repository"
import { Iuser } from '../../../doamin/entities/user';



export class Googleuser{
 constructor(private regRepository: RegRepository) {}

  async login(credential:string): Promise<Iuser> {
    try {
      const user=await this.regRepository.usergoogleLogin(credential);
      return user

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Unexpected error occurred during user registration");
    }
  }

}