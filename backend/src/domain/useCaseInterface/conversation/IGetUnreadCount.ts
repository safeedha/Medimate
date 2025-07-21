import {UnreadCounts} from '../../../dto/message.dto'


export interface IGetUnreadCount {
  getcount(userId: string): Promise<UnreadCounts>;
}