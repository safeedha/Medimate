import {INotification}from '../../dto/notification.dto'
export interface NotificationRepository{
  addnotification(user:string,doctor:string,message:string,type:"consultation" | "cancellation" | "refund" | "schedule"|"followup"):Promise<void>
  getUnreadnotification(id:string):Promise<INotification[]>
  readNotification(id:string):Promise<void>
}