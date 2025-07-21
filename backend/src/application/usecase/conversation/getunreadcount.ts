import { ConversationRepository } from '../../../domain/repository/conver-repo';
import { UnreadCounts } from '../../../dto/message.dto';
import { IGetUnreadCount } from '../../../domain/useCaseInterface/conversation/IGetUnreadCount';

export class GetUnreadCountMessage implements IGetUnreadCount {
  constructor(private conversationRepository: ConversationRepository) {}

  async getcount(receiverId: string): Promise<UnreadCounts> {
    try {
      const result = await this.conversationRepository.getcount(receiverId);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('An unexpected error occurred while fetching unread counts');
    }
  }
}
