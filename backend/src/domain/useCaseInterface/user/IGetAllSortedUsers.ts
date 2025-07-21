import {UserDTO} from '../../../dto/user.dto'


export interface IGetAllSortedUsers {
  getAllSortUser(search: string): Promise<{ users: UserDTO[]; total: number }>;
}