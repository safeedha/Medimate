
import {IUserRepository} from '../../../domain/repository/UserRepository';
import {IUserLogin} from "../../../domain/useCaseInterface/auth/IUserLogin"
import jwt from 'jsonwebtoken';
import {UserDTO} from '../../../dto/user.dto'


export class UserLogin implements IUserLogin {
  constructor(private _userRepository: IUserRepository) {}

  async login(data: { email: string, password: string }): Promise<{
    user: UserDTO,
    accessToken: string,
    refreshToken: string
  }> {
    try {
      const { email, password } = data;
      
      const userloged = await this._userRepository.userLogin(email, password);
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
      throw new Error("Unexpected error occurred during user login");
    }
  }
}
