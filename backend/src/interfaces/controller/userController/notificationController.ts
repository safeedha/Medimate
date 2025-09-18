import { Request, Response, NextFunction } from 'express';
import { IGetNotification } from "../../../domain/useCaseInterface/notification/getUnreadnotifcation";
import { IReadNotification } from "../../../domain/useCaseInterface/notification/readnotification";
import { HttpStatus } from '../../../constant/httpStatus';
import { HttpMessage } from '../../../constant/httpessages';

interface CustomRequest extends Request {
  id: string;
}

export class NotificationController {
  constructor(
    private readonly _getNotification: IGetNotification,
    private readonly _readNotification: IReadNotification
  ) {}

  async getUnreadNotification(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req;
      const result = await this._getNotification.getnotification(id);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async readAllNotification(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req;
      await this._readNotification.readnotification(id);
      res.status(HttpStatus.OK).json({ message: HttpMessage.NOTIFICATION_READE });
    } catch (error) {
      next(error);
    }
  }
}
