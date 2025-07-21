import { Iuser } from '../../../domain/entities/user';
import {UserDTO} from '../../../dto/user.dto'

export interface IUserLogin {
  login(data: { email: string; password: string }): Promise< {user: UserDTO,   accessToken: string,refreshToken: string}>;
}