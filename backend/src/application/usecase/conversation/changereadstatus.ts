import { IConversationRepository } from '../../../domain/repository/ConversationRepository';
import { MessageDto } from '../../../dto/message.dto';

export class ReadMessageStatus {
  constructor(private conversationrepository: IConversationRepository) {}

  async readmessage(messageId: string): Promise<MessageDto> {
    const result = await this.conversationrepository.changereadstatus(messageId);

    const messageDto: MessageDto = {
      _id: result._id?.toString(),
      senderId: result.senderId?.toString(),
      recieverId: result.recieverId?.toString(),
      message: result.message ?? undefined, // safely handle null
      image: result.image ?? undefined,    
      messageType: result.messageType,
      read: result.read ?? false,           
    };

    return messageDto;
  }
}
