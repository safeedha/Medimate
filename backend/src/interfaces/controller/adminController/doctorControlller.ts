import { Request, Response, NextFunction } from "express";
import { IGetUnverified } from '../../../domain/useCaseInterface/doctor/IGetUnverified';
import { IChangeDocStatus } from '../../../domain/useCaseInterface/doctor/IChangeDocStatus';
import { IVerifyDoctor } from '../../../domain/useCaseInterface/doctor/IVerifyDoctor';
import { IGetSingleDoctor } from "../../../domain/useCaseInterface/doctor/IGetSingleDoctor";
import { IGetAllDoctor } from '../../../domain/useCaseInterface/doctor/IGetAllDoctor';
import { HttpStatus } from '../../../constant/httpStatus';

export class DoctorController {
  constructor(
    private _getUnverified: IGetUnverified,
    private _changeDoctorStatus: IChangeDocStatus,
    private _verifyDoctor: IVerifyDoctor,
    private _getSingleDoctor: IGetSingleDoctor,
    private _getAllDoctor: IGetAllDoctor
  ) {}

  async getAllUnverifiedDoctors(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);
      const result = await this._getUnverified.getAllUnverifiedDoctors(page, limit);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllDoctors(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);
      const search = req.query.search as string;
      const result = await this._getAllDoctor.getAlldoctors(page, limit, search);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getSingleDoctordetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { doctorId } = req.params;
      const result = await this._getSingleDoctor.getsingledoc(doctorId);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async toggleDoctorBlockStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this._changeDoctorStatus.changesatus(id);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateVerificationStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body; 
      const reason = req.query.reason as string;
      const result = await this._verifyDoctor.verifyStatus(id, status, reason);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}
