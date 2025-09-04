import { INotificationRepository } from "../../domain/repository/NotificationRepository";
import {Notification } from '../database/models/notificatio';
import {INotification}from '../../domain/entities/Notification'

export class MongoNotification implements INotificationRepository {
  async addnotification(
    user: string,
    doctor: string,
    message: string,
    type: "consultation" | "cancellation" | "refund" | "schedule"|"followup",
  ): Promise<void> {
    try {
      const newNotification = new Notification({
        userId: user,
        senderId: doctor || null,
        type,
        message,
      });

       await newNotification.save();
    } catch (error) {
      console.error("Error creating notification:", error);
      throw new Error("Failed to create notification");
    }
  }

  async readNotification(id: string):Promise<void>
  {
 await Notification.updateMany({userId: id},{$set:{isRead: true}})
  }

async getUnreadnotification(id: string): Promise<INotification[]> {
  const notifications = await Notification.find({ userId: id, isRead: false }).sort({ createdAt: 1 })
  return notifications
}
}
