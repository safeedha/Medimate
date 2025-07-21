import { NotificationRepository } from "../../../domain/repository/not-repository"
import jwt from 'jsonwebtoken';
import {UserDTO} from '../../../dto/user.dto'
import {IAddNotification}  from "../../../domain/useCaseInterface/notification/addnotification"




export class Addnotification implements IAddNotification {
  constructor(private notRepository:  NotificationRepository) {}
   async addnotification(user:string,doctor:string,message:string,type:"consultation" | "cancellation" | "refund" | "schedule"|"followup"): Promise<void>{
      await this.notRepository.addnotification(user,doctor,message,type)
   }
}
