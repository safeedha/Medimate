import {INotification}from '../../domain/entities/Notification'
export interface INotificationRepository{
  addnotification(user:string,doctor:string,message:string,type:"consultation" | "cancellation" | "refund" | "schedule"|"followup"):Promise<void>
  getUnreadnotification(id:string):Promise<INotification[]>
  readNotification(id:string):Promise<void>
}