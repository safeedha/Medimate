import { IConversationRepository } from '../../../domain/repository/ConversationRepository';
import { IGetAllMessages } from '../../../domain/useCaseInterface/conversation/IGetAllMessages';
import { MessageDto } from '../../../dto/message.dto';

export class GetAllMessages implements IGetAllMessages {
  constructor(private _conversationRepository: IConversationRepository) {}

  async getallmessage(receiverId: string, senderId: string): Promise<MessageDto[]> {
    try {
  
      const result = await this._conversationRepository.getAllmessage(senderId, receiverId);

      const messages: MessageDto[] = result.map((msg) => ({
        _id: msg._id?.toString(),
        senderId: msg.senderId?.toString(),
        recieverId: msg.recieverId?.toString(),
        message: msg.message ?? undefined,
        image: msg.image ?? undefined,
        messageType: msg.messageType,
        read: msg.read ?? false,
      }));

      return messages;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred while fetching messages");
    }
  }
}

