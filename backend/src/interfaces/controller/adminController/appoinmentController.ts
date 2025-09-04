
import { Request, Response, NextFunction } from 'express';
import{IGetDashboardAppointment} from '../../../domain/useCaseInterface/appoinment/IGetDashboardAppointment';
import{IGetCountOfAppointmentsForDoctor } from '../../../domain/useCaseInterface/appoinment/IGetCountOfAppointmentsForDoctor';
import{IGetFilteredAppointment } from '../../../domain/useCaseInterface/appoinment/IGetFilteredAppointment';
import {IGetDepartmentSummary} from '../../../domain/useCaseInterface/appoinment/IGetdeaprtmentsummary'
import { HttpStatus } from '../../../common/httpStatus';
import {HttpMessage}  from '../../../common/httpessages';
export class AppointmentController {
  constructor(

    private getDashboardAppointment: IGetDashboardAppointment,
    private getCountOfAppointmentsForDoctor: IGetCountOfAppointmentsForDoctor,
    private getFilteredAppointment: IGetFilteredAppointment,
    private getdepartmentsummary:IGetDepartmentSummary
  ) {}


  async getDashboardOverview(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.getDashboardAppointment.getoverview();
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

    async getDepartmentsummary(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const result = await this.getdepartmentsummary.getsummary()
        res.status(HttpStatus.OK).json(result);
      } catch (error) {
        next(error);
      }
    }

  async getAppointmentCountByStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { status } = req.query;
      if (typeof status !== 'string' || !['completed', 'pending', 'cancelled'].includes(status)) {
        res.status(HttpStatus.BAD_REQUEST).json({  message: HttpMessage.INVALID_STATUS });
        return;
      }
      const result = await this.getCountOfAppointmentsForDoctor.getcount(status as 'completed' | 'pending' | 'cancelled');
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAppointmentsByDateRange(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { status, start, end } = req.query;

      if (!status || !start || !end) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: HttpMessage.MISSING_FIELDS });
        return;
      }

      const startDate = new Date(start as string);
      const endDate = new Date(end as string);

      const result = await this.getFilteredAppointment.getappoinmentrange(
        status as 'completed' | 'cancelled' | 'pending',
        startDate,
        endDate
      );

      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}
