import {INotification}from '../../domain/entities/Notification'
export interface INotificationRepository{
  
  getUnreadnotification(id:string):Promise<INotification[]>
  readNotification(id:string):Promise<void>
}