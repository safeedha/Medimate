import { Request, Response, NextFunction } from 'express';
import { IGetDoctorAppointments } from '../../../domain/useCaseInterface/appoinment/IGetDoctorAppointments';
import { IChangeAppointmentStatus } from '../../../domain/useCaseInterface/appoinment/IChangeAppointmentStatus';
import { IGetSingleAppointment } from '../../../domain/useCaseInterface/appoinment/IGetSingleAppointment';
import { IRescheduleAppointment } from '../../../domain/useCaseInterface/appoinment/IRescheduleAppointment';
import { IGetDoctorAppointmentCount } from '../../../domain/useCaseInterface/appoinment/IGetDoctorAppointmentCount';
import { IGetFilterAppointments } from '../../../domain/useCaseInterface/appoinment/IGetFilterAppointments';
import { ICreateFollowUp } from '../../../domain/useCaseInterface/appoinment/ICreateFollowUp';
import { IGetAppointmentPagination } from '../../../domain/useCaseInterface/appoinment/IGetAppointmentPagination';
import { HttpStatus } from '../../../common/httpStatus';
import { sendMail } from '../../../application/service/emailservice';

interface CustomRequest extends Request {
  id: string;
}

export class DoctorAppointmentController {
  constructor(
    private getDoctorAppointments: IGetDoctorAppointments,
    private changeAppointmentStatus: IChangeAppointmentStatus,
    private getSingleAppointment: IGetSingleAppointment,
    private rescheduleAppointment: IRescheduleAppointment,
    private getAppointmentCount: IGetDoctorAppointmentCount,
    private getFilterService: IGetFilterAppointments,
    private createFollowUp: ICreateFollowUp,
    private getPaginationData: IGetAppointmentPagination,
    
  ) {}

  async fetchAllAppointments(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req;
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);
      const appointments = await this.getDoctorAppointments.getallappoinment(id, page, limit);
      res.status(HttpStatus.OK).json({ appoi: appointments });
    } catch (error) {
      next(error);
    }
  }

  async createFollowUpAppointment(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { slotId, appoinmentId } = req.body;
      const result = await this.createFollowUp.createfollowpappinment(slotId, appoinmentId);
      res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  }

  async cancelAppointmentWithReason(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { reason, email } = req.body;
      const status: 'pending' | 'cancelled' | 'completed' = 'cancelled';
      const result = await this.changeAppointmentStatus.changestus(id, status);
      await sendMail(email, undefined, 'Reason for Appointment Cancellation', reason);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async rescheduleAppointmentWithReason(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { canceledslot, reason, email, newslot } = req.body;
      const status: 'pending' | 'cancelled' | 'completed' = 'cancelled';

      await this.changeAppointmentStatus.changestus(canceledslot, status, true);
      const result = await this.rescheduleAppointment.createresedule(canceledslot, newslot);
      await sendMail(email, undefined, 'Reason for Appointment Cancellation', reason);

      res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  }

  async markAppointmentCompleted(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const status: 'pending' | 'cancelled' | 'completed' = 'completed';
      const result = await this.changeAppointmentStatus.changestus(id, status);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getSingleAppointmentdetail(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.getSingleAppointment.getsingleappoinment(id);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }



  async getAppointmentsOverview(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req;
      const result = await this.getAppointmentCount.getcountofappoinment(id);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getFilteredAppointments(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req;
      const { status, start, end } = req.query;

      if (!status || !start || !end) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Missing status, start, or end date' });
        return;
      }

      const startDate = new Date(start as string);
      const endDate = new Date(end as string);

      const result = await this.getFilterService.getappoinmentrange(
        status as 'completed' | 'cancelled' | 'pending',
        startDate,
        endDate,
        id
      );

      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async paginateAppointments(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req;
      const originalId = req.query.originalId as string;
      const limit = parseInt(req.query.limit as string);
      const result = await this.getPaginationData.getpageforappoinment(id, originalId, limit);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  
}
