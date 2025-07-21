import { Request, Response, NextFunction } from 'express';
import { IGetAllSortedUsers } from '../../../domain/useCaseInterface/user/IGetAllSortedUsers';
import { HttpStatus } from '../../../common/httpStatus';

export class UserManagementController {
  constructor(private getUserBysort: IGetAllSortedUsers) {}

  async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const search = (req.query.search as string) || '';
      const users = await this.getUserBysort.getAllSortUser(search);

      res.status(HttpStatus.OK).json(users);
    } catch (error) {
      next(error);
    }
  }
}

