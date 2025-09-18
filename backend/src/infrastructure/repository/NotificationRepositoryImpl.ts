import { INotificationRepository } from "../../domain/repository/NotificationRepository";
import { Notification } from "../database/models/notificatio";
import { INotification } from "../../domain/entities/Notification";
import { BaseRepository } from "./BaseRepositoryImpl";

export class MongoNotification 
  extends BaseRepository<INotification> 
  implements INotificationRepository {

  async create(data: INotification): Promise<void> {
    const newNotification = new Notification({ ...data });
    await newNotification.save();
  }

  async readNotification(id: string): Promise<void> {
    await Notification.updateMany({ userId: id }, { $set: { isRead: true } });
  }

  async getUnreadnotification(id: string): Promise<INotification[]> {
    return Notification.find({ userId: id, isRead: false })
                       .sort({ createdAt: 1 });
  }
}
