import { INotificationRepository } from "../../../domain/repository/NotificationRepository"
import { IGetNotification } from "../../../domain/useCaseInterface/notification/getUnreadnotifcation"
import { NotificationDto } from '../../../dto/notification.dto'


export class Getunreadnotification implements IGetNotification {
  constructor(private notRepository: INotificationRepository) {}

  async getnotification(id: string): Promise<NotificationDto[]> {
    const notifications = await this.notRepository.getUnreadnotification(id)

    
    return notifications.map((n) => ({
      _id: n._id,
      type: n.type,
      message: n.message,
      createdAt: n.createdAt
    }))
  }
}

