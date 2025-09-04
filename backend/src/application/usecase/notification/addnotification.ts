import { INotificationRepository } from "../../../domain/repository/NotificationRepository"
import {IAddNotification}  from "../../../domain/useCaseInterface/notification/addnotification"




export class Addnotification implements IAddNotification {
  constructor(private notRepository:  INotificationRepository) {}
   async addnotification(user:string,doctor:string,message:string,type:"consultation" | "cancellation" | "refund" | "schedule"|"followup"): Promise<void>{
      await this.notRepository.addnotification(user,doctor,message,type)
   }
}
