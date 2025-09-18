import { IRegistrationRepository  } from "../../../domain/repository/RegistrationRepository"
import {IGoogleAuth} from "../../../domain/useCaseInterface/auth/IGoogleAuth"
import jwt from 'jsonwebtoken'
import {UserDTO} from '../../../dto/user.dto'
import {IUserRepository} from '../../../domain/repository/UserRepository';


 export class GoogleAuth implements IGoogleAuth{
 constructor(private _userRepository: IUserRepository) {}

  async googleLogin(credential:string): Promise<{
    user: UserDTO,
    accessToken: string,
    refreshToken: string
  }> {
    try {
      const userloged=await this._userRepository.usergoogleLogin(credential);
       const user={
            _id:userloged._id,
            firstname: userloged.firstname,
            lastname: userloged.lastname,
            email: userloged.email,
          };
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