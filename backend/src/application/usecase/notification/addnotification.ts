
import { INotification } from "../../../domain/entities/Notification"
import { IBaseRepository } from '../../../domain/repository/BaseRepository' 
import { IAddNotification } from "../../../domain/useCaseInterface/notification/addnotification"


export class Addnotification implements IAddNotification {
  constructor(private _baseRepository: IBaseRepository<INotification>) {}
   async addnotification(user:string,doctor:string,message:string,type:"consultation"|"cancellation" |"refund"|"reschedule"|"followup"): Promise<void>{
      await this._baseRepository.create({userId:user,senderId:doctor,message,type})
   }
}
