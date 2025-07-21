import { NotificationRepository } from "../../../domain/repository/not-repository"
import {IReadNotification}  from "../../../domain/useCaseInterface/notification/readnotification"



export class Readnotification implements IReadNotification {
  constructor(private notRepository:  NotificationRepository) {}
   async readnotification(id:string): Promise<void>{
      await this.notRepository.readNotification(id)
   }
}
