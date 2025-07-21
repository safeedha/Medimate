import {UserDTO} from '../../../dto/user.dto'
export interface IChangeStatus {
  changesatus(id: string): Promise<UserDTO[]>;
}