import { Request, Response, NextFunction } from "express";
import { IGetUser } from "../../../domain/useCaseInterface/user/IGetUser";
import { IChangeStatus } from "../../../domain/useCaseInterface/user/IChangeStatus";
import { IGetSingleUser } from "../../../domain/useCaseInterface/user/IGetSingleUser";
import { HttpStatus } from "../../../constant/httpStatus";

export class UserController {
  constructor(
    private readonly _getUser: IGetUser,
    private readonly _changeStatus: IChangeStatus,
    private readonly _getSingleUser: IGetSingleUser
  ) {}

  async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string, 10);
      const limit = parseInt(req.query.limit as string, 10);
      const search = req.query.search as string;

      const result = await this._getUser.getAllUser(page, limit, search);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async toggleUserBlockStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this._changeStatus.changesatus(id);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getSingleUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this._getSingleUser.getsingleUser(id);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}
