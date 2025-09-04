import { INotificationRepository } from "../../../domain/repository/NotificationRepository"
import {IReadNotification}  from "../../../domain/useCaseInterface/notification/readnotification"



export class Readnotification implements IReadNotification {
  constructor(private notRepository:  INotificationRepository) {}
   async readnotification(id:string): Promise<void>{
      await this.notRepository.readNotification(id)
   }
}
