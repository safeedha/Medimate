import { UserDTO } from '../../../dto/user.dto';

export interface IGetUser {
  getAllUser(page: number, limit: number, search: string): Promise<{
    users: UserDTO[];
    total: number;
  }>;
}