
import { ConversationRepository } from '../../../domain/repository/conver-repo';
import { Message } from '../../../domain/entities/messages';
import { IGetAllMessages } from '../../../domain/useCaseInterface/conversation/IGetAllMessages';

export class GetAllMessages implements IGetAllMessages {
  constructor(private conversationRepository: ConversationRepository) {}

  async getallmessage(receiverId: string, senderId: string): Promise<Message[]> {
    try {
      const result = await this.conversationRepository.getAllmessage(senderId, receiverId);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred while fetching messages");
    }
  }
}
