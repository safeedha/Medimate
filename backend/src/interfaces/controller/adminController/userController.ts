import { Request, Response, NextFunction } from "express";
import { IGetUser } from '../../../domain/useCaseInterface/user/IGetUser';
import { IChangeStatus } from '../../../domain/useCaseInterface/user/IChangeStatus';
import { IGetSingleUser } from '../../../domain/useCaseInterface/user/IGetSingleUser';
import { HttpStatus } from '../../../common/httpStatus';

export class UserController {
  constructor(
    private getUser: IGetUser,
    private changeStatus: IChangeStatus,
    private getSingleUser: IGetSingleUser
  ) {}

  async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);
      const search = req.query.search as string;

      const result = await this.getUser.getAllUser(page, limit, search);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async toggleUserBlockStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.changeStatus.changesatus(id);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getsingleuser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.getSingleUser.getsingleUser(id);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}
