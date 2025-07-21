import { RegRepository  } from "../../../domain/repository/reg-repository"
import { Iuser } from '../../../domain/entities/user';
import {IGoogleAuth} from "../../../domain/useCaseInterface/auth/IGoogleAuth"
import jwt from 'jsonwebtoken'
import {UserDTO} from '../../../dto/user.dto'


 export class GoogleAuth implements IGoogleAuth{
 constructor(private regRepository: RegRepository) {}

  async googleLogin(credential:string): Promise<{
    user: UserDTO,
    accessToken: string,
    refreshToken: string
  }> {
    try {
      const user=await this.regRepository.usergoogleLogin(credential);
        const accessToken = jwt.sign(
          { id: user._id, role: 'user' },
          process.env.JWT_SECRET!,
          { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
          { id: user._id, role: 'user' },
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