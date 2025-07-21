import { Request, Response, NextFunction } from 'express';
import {IGetNotification}  from "../../../domain/useCaseInterface/notification/getUnreadnotifcation"
import { HttpStatus } from '../../../common/httpStatus';
import { Messages } from '../../../common/messages';
import {IReadNotification}  from "../../../domain/useCaseInterface/notification/readnotification"

interface CustomRequest extends Request {
  id: string;
}

export class NotificationController {
  constructor(
   private getNotification:IGetNotification,
   private readNotification:IReadNotification
  ) {}
    async getUnreadnotification(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
       try {
         const {id}=req
         const result=await this.getNotification.getnotification(id)
         res.status(HttpStatus.OK).json(result);
       } catch (error) {
         next(error);
       }
     }

     async readAllnotification(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
       try {
         const {id}=req
         await this.readNotification.readnotification(id)
         res.status(HttpStatus.OK).json({message: Messages.NOTIFICATION_READE});
       } catch (error) {
         next(error);
       }
     }

}