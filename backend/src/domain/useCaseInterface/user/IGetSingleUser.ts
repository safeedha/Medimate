import {UserDTO} from '../../../dto/user.dto'
export interface IGetSingleUser {
  getsingleUser(userId: string): Promise<UserDTO>;
}