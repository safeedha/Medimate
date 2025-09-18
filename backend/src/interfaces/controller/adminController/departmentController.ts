import { Request, Response, NextFunction } from 'express';
import { IAddDept } from "../../../domain/useCaseInterface/department/IAddDept";
import { IGetDept } from "../../../domain/useCaseInterface/department/IGetDept";
import { IEditDept } from "../../../domain/useCaseInterface/department/IEditDept";
import { IBlockDept } from "../../../domain/useCaseInterface/department/IBlockDept";
import { HttpStatus } from '../../../constant/httpStatus';

export class DepartmentController {
  constructor(
    private _addDept: IAddDept,
    private _getDept: IGetDept,
    private _editDept: IEditDept,
    private _blockDept: IBlockDept
  ) {}

  async createDepartment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { deptname, description } = req.body;
      const result = await this._addDept.addDept({ deptname, description });
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getDepartment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);
      const search = req.query.search as string;
      const result = await this._getDept.getAllDept(page, limit, search);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async editDepartment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { deptname, description } = req.body;
      const data = { _id: id, deptname, description };
      console.log(data);
      const result = await this._editDept.editDept(data);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async blockDepartment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this._blockDept.blockDept(id);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}
