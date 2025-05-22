import { RegRepository } from "../../../domain/repository/reg-repository"
import { Iuser } from '../../../domain/entities/user';
import jwt from 'jsonwebtoken';

export class UserLog {
  constructor(private regRepository: RegRepository) {}

  async login(data: { email: string, password: string }): Promise<{
    user: Iuser,
    accessToken: string,
    refreshToken: string
  }> {
    try {
      const { email, password } = data;
      
      const user = await this.regRepository.userLogin(email, password);

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
      throw new Error("Unexpected error occurred during user login");
    }
  }
}
