import { Iuser } from '../../../domain/entities/user';
import {UserDTO} from '../../../dto/user.dto'
export interface IGoogleAuth {
  googleLogin(credential: string): Promise<{user: UserDTO,accessToken: string,refreshToken: string}>;
}