import {INotification}from '../../../dto/notification.dto'

export interface IGetNotification {
  getnotification(id:string): Promise<INotification[]>;
}