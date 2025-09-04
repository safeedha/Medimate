import {NotificationDto}from '../../../dto/notification.dto'

export interface IGetNotification {
  getnotification(id:string): Promise<NotificationDto[]>;
}