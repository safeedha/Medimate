import { Request, Response, NextFunction } from 'express';
import { IGetAllSortedUsers } from '../../../domain/useCaseInterface/user/IGetAllSortedUsers';
import { IUpdateMessagetime } from '../../../domain/useCaseInterface/conversation/IUpdateMessagetime';
import { HttpStatus } from '../../../constant/httpStatus';

interface CustomRequest extends Request {
  id: string;
}

export class UserManagementController {
  constructor(
    private readonly _getUserBysort: IGetAllSortedUsers,
    private readonly _updateMessagetime: IUpdateMessagetime
  ) {}

  async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const search = (req.query.search as string) || '';
      const users = await this._getUserBysort.getAllSortUser(search);
      res.status(HttpStatus.OK).json(users);
    } catch (error) {
      next(error);
    }
  }

  async updatemessagetime(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req;
      const { reciever } = req.params;

      const result = await this._updateMessagetime.update(id!, reciever);
      res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  }
}
