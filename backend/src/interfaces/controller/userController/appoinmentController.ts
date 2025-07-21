import { Request, Response, NextFunction } from 'express';
import { IGetSlotByDate } from '../../../domain/useCaseInterface/slot/IGetSlotByDate';
import { ICreateAppointment } from '../../../domain/useCaseInterface/appoinment/ICreateAppointment';
import { IGetFutureAppointments } from '../../../domain/useCaseInterface/appoinment/IGetFutureAppointments';
// import { GetpastAppointment } from '../../../application/usecase/appoinment/getpastappoi';
import { IChangeAppointmentStatus } from '../../../domain/useCaseInterface/appoinment/IChangeAppointmentStatus';
import { ICreateLockSlot } from '../../../domain/useCaseInterface/slot/ICreateLockSlot';
import { IGetAppointmentPagination } from '../../../domain/useCaseInterface/appoinment/IGetAppointmentPagination';
import { IGetAppointmentReport } from '../../../domain/useCaseInterface/report/IGetAppointmentReport';
import { HttpStatus } from '../../../common/httpStatus';

interface CustomRequest extends Request {
  id: string;
}

export class AppointmentUserController {
  constructor(
    private getSlotByDate: IGetSlotByDate,
    private createAppointment: ICreateAppointment,
    private getFutureAppointments: IGetFutureAppointments,
    // private getPastAppointments: GetpastAppointment,
    private changeAppointmentStatus: IChangeAppointmentStatus,
    private createLockSlot: ICreateLockSlot,
    private getPaginationData: IGetAppointmentPagination,
    private getReport: IGetAppointmentReport
  ) {}

  async createlockSlot(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { slotid, doctorid } = req.body;
      const result = await this.createLockSlot.createLock(slotid, doctorid);
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

      const result = await this.getSlotByDate.getSlotsByDate(id, new Date(date));
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async bookAppointment(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.id;
      const { doctorId, slot, name, email, age, gender, reason, amount } = req.body;
      const result = await this.createAppointment.createAppointment(
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
      const result = await this.getFutureAppointments.getfutureappoinment(userId, page, limit);
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
      const result = await this.getPaginationData.getpageforappoinment(userId, originalId, limit);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  // async fetchPastAppointments(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const userId = req.id;
  //     const result = await this.getPastAppointments.getpastappoinment(userId);
  //     res.status(HttpStatus.OK).json(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async cancelAppointment(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { appoinmentid } = req.body;
      const status: 'pending' | 'cancelled' | 'completed' = 'cancelled';
      const result = await this.changeAppointmentStatus.changestus(appoinmentid, status);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async reportGet(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { appId } = req.params;
      const result = await this.getReport.getreport(appId);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}
