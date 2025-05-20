import { RegRepository  } from "../../../doamin/repository/reg-repository"
import { Iuser } from '../../../doamin/entities/user';
import jwt from 'jsonwebtoken'


export class Googleuser{
 constructor(private regRepository: RegRepository) {}

  async login(credential:string): Promise<{
    user: Iuser,
    accessToken: string,
    refreshToken: string
  }> {
    try {
      const user=await this.regRepository.usergoogleLogin(credential);
       const accessToken = jwt.sign(
              { id: user._id },
              process.env.JWT_SECRET!,
              { expiresIn: '15m' }
            );
      
            const refreshToken = jwt.sign(
              { id: user._id },
              process.env.JWT_REFRESH_SECRET!,
              { expiresIn: '7d' }
            );
        return {
        user,
        accessToken,
        refreshToken
      };

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Unexpected error occurred during user registration");
    }
  }

}