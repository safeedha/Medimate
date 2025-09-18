import { Request, Response, NextFunction } from "express";
import { IGetDoctorAppointments } from "../../../domain/useCaseInterface/appoinment/IGetDoctorAppointments";
import { IChangeAppointmentStatus } from "../../../domain/useCaseInterface/appoinment/IChangeAppointmentStatus";
import { IGetSingleAppointment } from "../../../domain/useCaseInterface/appoinment/IGetSingleAppointment";
import { IRescheduleAppointment } from "../../../domain/useCaseInterface/appoinment/IRescheduleAppointment";
import { IGetDoctorAppointmentCount } from "../../../domain/useCaseInterface/appoinment/IGetDoctorAppointmentCount";
import { IGetFilterAppointments } from "../../../domain/useCaseInterface/appoinment/IGetFilterAppointments";
import { ICreateFollowUp } from "../../../domain/useCaseInterface/appoinment/ICreateFollowUp";
import { IGetAppointmentPagination } from "../../../domain/useCaseInterface/appoinment/IGetAppointmentPagination";
import { HttpStatus } from "../../../constant/httpStatus";
import { sendMail } from "../../../application/service/emailservice";

interface CustomRequest extends Request {
  id: string;
}

export class DoctorAppointmentController {
  constructor(
    private readonly _getDoctorAppointments: IGetDoctorAppointments,
    private readonly _changeAppointmentStatus: IChangeAppointmentStatus,
    private readonly _getSingleAppointment: IGetSingleAppointment,
    private readonly _rescheduleAppointment: IRescheduleAppointment,
    private readonly _getAppointmentCount: IGetDoctorAppointmentCount,
    private readonly _getFilterService: IGetFilterAppointments,
    private readonly _createFollowUp: ICreateFollowUp,
    private readonly _getPaginationData: IGetAppointmentPagination
  ) {}

  async fetchAllAppointments(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req;
      const page = parseInt(req.query.page as string, 10);
      const limit = parseInt(req.query.limit as string, 10);
      const appointments = await this._getDoctorAppointments.getallappoinment(id, page, limit);
      res.status(HttpStatus.OK).json({ appointments });
    } catch (error) {
      next(error);
    }
  }

  async createFollowUpAppointment(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { slotId, appoinmentId } = req.body;
      const result = await this._createFollowUp.createfollowpappinment(slotId, appoinmentId);
      res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  }

  async cancelAppointmentWithReason(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { reason, email } = req.body;
      const status: "pending" | "cancelled" | "completed" = "cancelled";
      const result = await this._changeAppointmentStatus.changestus(id, status);
      await sendMail(email, undefined, "Reason for Appointment Cancellation", reason);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async rescheduleAppointmentWithReason(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { canceledslot, reason, email, newslot } = req.body;
      const status: "pending" | "cancelled" | "completed" = "cancelled";

      await this._changeAppointmentStatus.changestus(canceledslot, status, true);
      const result = await this._rescheduleAppointment.createresedule(canceledslot, newslot);
      await sendMail(email, undefined, "Reason for Appointment Cancellation", reason);

      res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  }

  async markAppointmentCompleted(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const status: "pending" | "cancelled" | "completed" = "completed";
      const result = await this._changeAppointmentStatus.changestus(id, status);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getSingleAppointmentDetail(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this._getSingleAppointment.getsingleappoinment(id);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAppointmentsOverview(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req;
      const result = await this._getAppointmentCount.getcountofappoinment(id);
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
        res.status(HttpStatus.BAD_REQUEST).json({ message: "Missing status, start, or end date" });
        return;
      }

      const startDate = new Date(start as string);
      const endDate = new Date(end as string);

      const result = await this._getFilterService.getappoinmentrange(
        status as "completed" | "cancelled" | "pending",
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
      const limit = parseInt(req.query.limit as string, 10);
      const result = await this._getPaginationData.getpageforappoinment(id, originalId, limit);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}
