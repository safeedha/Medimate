import { Request, Response, NextFunction } from 'express';
import { IGetSlotByDate } from '../../../domain/useCaseInterface/slot/IGetSlotByDate';
import { ICreateAppointment } from '../../../domain/useCaseInterface/appoinment/ICreateAppointment';
import { IGetFutureAppointments } from '../../../domain/useCaseInterface/appoinment/IGetFutureAppointments';
import { IChangeAppointmentStatus } from '../../../domain/useCaseInterface/appoinment/IChangeAppointmentStatus';
import { ICreateLockSlot } from '../../../domain/useCaseInterface/slot/ICreateLockSlot';
import { IGetAppointmentPagination } from '../../../domain/useCaseInterface/appoinment/IGetAppointmentPagination';
import { IGetAppointmentReport } from '../../../domain/useCaseInterface/report/IGetAppointmentReport';
import { HttpStatus } from '../../../constant/httpStatus';

interface CustomRequest extends Request {
  id: string;
}

export class AppointmentUserController {
  constructor(
    private readonly _getSlotByDate: IGetSlotByDate,
    private readonly _createAppointment: ICreateAppointment,
    private readonly _getFutureAppointments: IGetFutureAppointments,
    private readonly _changeAppointmentStatus: IChangeAppointmentStatus,
    private readonly _createLockSlot: ICreateLockSlot,
    private readonly _getPaginationData: IGetAppointmentPagination,
    private readonly _getReport: IGetAppointmentReport
  ) {}

  async createLockSlot(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { slotid, doctorid } = req.body;
      const result = await this._createLockSlot.createLock(slotid, doctorid);
      res.status(HttpStatus.CREATED).json({ message: result });
    } catch (error) {
      next(error);
    }
  }

  async getDoctorSlotsByDate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const date = req.query.date as string | undefined;

      if (!date) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Date is required' });
        return;
      }

      const result = await this._getSlotByDate.getSlotsByDate(id, new Date(date));
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async bookAppointment(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.id;
      const { doctorId, slot, name, email, age, gender, reason, amount } = req.body;
      const result = await this._createAppointment.createAppointment(
        userId,
        doctorId,
        slot,
        name,
        email,
        age,
        gender,
        reason,
        amount
      );
      res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  }

  async fetchFutureAppointments(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.id;
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);
      const result = await this._getFutureAppointments.getfutureappoinment(userId, page, limit);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async fetchAppointmentPages(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.id;
      const originalId = req.query.originalId as string;
      const limit = parseInt(req.query.limit as string);
      const result = await this._getPaginationData.getpageforappoinment(userId, originalId, limit);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async cancelAppointment(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { appoinmentid } = req.body;
      const status: 'pending' | 'cancelled' | 'completed' = 'cancelled';
      const result = await this._changeAppointmentStatus.changestus(appoinmentid, status);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async reportGet(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { appId } = req.params;
      const result = await this._getReport.getreport(appId);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}
