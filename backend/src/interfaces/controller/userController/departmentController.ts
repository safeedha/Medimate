import { Request, Response, NextFunction } from 'express';
import { IGetUnblockedDepartments } from "../../../domain/useCaseInterface/department/IGetUnblockedDepartments";
import { HttpStatus } from '../../../constant/httpStatus';

export class DepartmentController {
  constructor(private readonly _getAllUnblockedDept: IGetUnblockedDepartments) {}

  async fetchAllUnblockedDepartments(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const departments = await this._getAllUnblockedDept.getAllunblockedDept();
      res.status(HttpStatus.OK).json(departments);
    } catch (error) {
      next(error);
    }
  }
}
