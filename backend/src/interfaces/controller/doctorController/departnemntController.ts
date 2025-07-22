import { Request, Response, NextFunction } from 'express';
import {IGetUnblockedDepartments} from "../../../domain/useCaseInterface/department/IGetUnblockedDepartments"
import { HttpStatus } from '../../../common/httpStatus';
import { IGetDept } from "../../../domain/useCaseInterface/department/IGetDept";

export class DepartmentController {
  constructor(private getAllUnblockedDept: IGetUnblockedDepartments,
    private getdepartment:IGetDept
  ) {}

  async fetchAllUnblockedDepartments(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const departments = await this.getAllUnblockedDept.getAllunblockedDept();// getAllunblockedDept()
      res.status(HttpStatus.OK).json(departments);
    } catch (error) {
      next(error);
    }
  }
  async fetchAlldDepartment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const departments = await this.getdepartment.getAllDept();
      res.status(HttpStatus.OK).json(departments);
    } catch (error) {
      next(error);
    }
  }
}
