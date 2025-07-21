import { Request, Response, NextFunction } from 'express';
import { IGetSingleDoctor } from "../../../domain/useCaseInterface/doctor/IGetSingleDoctor";
import { IGetVerifiedDoctors } from "../../../domain/useCaseInterface/doctor/IGetVerifiedDoctors";
import { IGetSortedDoctors } from "../../../domain/useCaseInterface/doctor/IGetSortedDoctors";
import { HttpStatus } from '../../../common/httpStatus';

export class DoctorController {
  constructor(
    private getSingleDoctor: IGetSingleDoctor,
    private getVerifiedDoctors: IGetVerifiedDoctors,
    private getSortedDoctors: IGetSortedDoctors
  ) {}

  async fetchAllVerifiedDoctors(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const department = req.query.department as string | undefined;
      const search = req.query.search as string | undefined;
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);
      const experience=req.query.experience as string|undefined

      const result = await this.getVerifiedDoctors.getAllVerifiedDoctors(page, limit, department, search,experience);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async fetchSortedDoctors(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const search = req.query.search as string | undefined;
      const result = await this.getSortedDoctors.getAllDoctors(search!);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async fetchSingleDoctor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const doctor = await this.getSingleDoctor.getsingledoc(id);
      res.status(HttpStatus.OK).json(doctor);
    } catch (error) {
      next(error);
    }
  }
}

