import { NotificationRepository } from "../../../domain/repository/not-repository"
import {IGetNotification}  from "../../../domain/useCaseInterface/notification/getUnreadnotifcation"
import {INotification}from '../../../dto/notification.dto'




export class Getunreadnotification implements IGetNotification {
  constructor(private notRepository:  NotificationRepository) {}
   async getnotification(id:string): Promise<INotification[]>{
      let notification=await this.notRepository.getUnreadnotification(id)
      return notification
   }
}
