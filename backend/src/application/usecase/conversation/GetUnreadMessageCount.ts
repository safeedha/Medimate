import { IConversationRepository } from '../../../domain/repository/ConversationRepository';
import { UnreadCounts } from '../../../dto/message.dto';
import { IGetUnreadCount } from '../../../domain/useCaseInterface/conversation/IGetUnreadCount';

export class GetUnreadCountMessage implements IGetUnreadCount {
  constructor(private _conversationRepository: IConversationRepository) {}

  async getcount(receiverId: string): Promise<UnreadCounts> {
    try {
      const count = await this._conversationRepository.getcount(receiverId);
       
      
        return count;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('An unexpected error occurred while fetching unread counts');
    }
  }
}
