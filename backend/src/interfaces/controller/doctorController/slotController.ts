import { Request, Response, NextFunction } from 'express';
import { ICreateSlot } from '../../../domain/useCaseInterface/slot/ICreateSlot';
import {IEditSlot} from '../../../domain/useCaseInterface/slot/IEditRecslot';
import { IGetRecurringSlot } from '../../../domain/useCaseInterface/slot/IGetRecurringSlot';
import { ICancelRecurringSlot } from '../../../domain/useCaseInterface/slot/ICancelRecurringSlot';
import { ICancelSlot } from '../../../domain/useCaseInterface/slot/ICancelSlot';
import { GetSlotByDate } from '../../../application/usecase/slot/getslotbydate';
import { HttpStatus } from '../../../common/httpStatus';

interface CustomRequest extends Request {
  id: string;
}

export class DoctorSlotController {
  constructor(
    private createSlot: ICreateSlot,
    private getRecurringSlots: IGetRecurringSlot,
    private cancelRecurringSlot: ICancelRecurringSlot,
    private cancelSlot: ICancelSlot,
    private getSlotByDate: GetSlotByDate,
    private editSlot:IEditSlot
  ) {}

  async cancelSingleSlot(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { slotid } = req.params;
      const result = await this.cancelSlot.cancelSlot(slotid);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async cancelRecurringSlots(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.cancelRecurringSlot.cancelSlots(id);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllRecurringSlots(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);
      const result = await this.getRecurringSlots.getSlots(id, page, limit);
      console.log(result)
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getDoctorSlotsByDate(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req;
      const date = req.query.date as string;
      if (!date) {
        throw new Error('Date is required');
      }
      const result = await this.getSlotByDate.getSlotsByDate(id, new Date(date));
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async createRecurringSlot(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req;
      const {
        startDate,
        endDate,
        selectedDays,
        startTime,
        endTime,
        interval,
        frequency
      } = req.body;

      const result = await this.createSlot.createSlots(
        id,
        startDate,
        endDate,
        selectedDays,
        startTime,
        endTime,
        interval,
        frequency
      );

      res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  }

  async editRecurringSlot(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const {recId}=req.params
      console.log('recid'+recId)
      const { id } = req;
      const {
        startDate,
        endDate,
        selectedDays,
        startTime,
        endTime,
        interval,
        frequency
      } = req.body;

      const result = await this.editSlot.editSlots(
        recId,
        id,
        startDate,
        endDate,
        selectedDays,
        startTime,
        endTime,
        interval,
        frequency
      );

      res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  }
}


