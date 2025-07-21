import { Request, Response, NextFunction } from "express";
import { IGetUnverified } from '../../../domain/useCaseInterface/doctor/IGetUnverified';
import { IChangeDocStatus } from '../../../domain/useCaseInterface/doctor/IChangeDocStatus'
import { IVerifyDoctor } from '../../../domain/useCaseInterface/doctor/IVerifyDoctor';
import {IGetSingleDoctor} from "../../../domain/useCaseInterface/doctor/IGetSingleDoctor"
import { IGetAllDoctor } from '../../../domain/useCaseInterface/doctor/IGetAllDoctor';

export class DoctorController {
  constructor(
    private getUnverified: IGetUnverified,
    private changeDoctorStatus: IChangeDocStatus,
    private verifyDoctor: IVerifyDoctor,
    private getSingleDoctor: IGetSingleDoctor,
    private getAllDoctor: IGetAllDoctor
  ) {}

  async getAllUnverifiedDoctors(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);
      const result = await this.getUnverified.getAllUnverifiedDoctors(page, limit);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllDoctors(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);
      const search = req.query.search as string;
      const result = await this.getAllDoctor.getAlldoctors(page,limit,search);//getAllDoctors(page, limit, search);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getSingleDoctordetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { doctorId } = req.params;
      const result = await this.getSingleDoctor.getsingledoc(doctorId)//getSingleDoctor(doctorId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async toggleDoctorBlockStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.changeDoctorStatus.changesatus(id);//
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateVerificationStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body; // 'Approved' or 'Rejected'
      const reason = req.query.reason as string;
      const result = await this.verifyDoctor.verifyStatus(id, status, reason);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}