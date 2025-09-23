import { IConversationRepository } from '../../../domain/repository/ConversationRepository';
import { MessageDto } from '../../../dto/message.dto';

export class SaveMessage {
  constructor(private _conversationrepository: IConversationRepository) {}

  async MessageSave(
    senderId: string,
    recieverId: string,
    message?: string,
    image?: string
  ): Promise<MessageDto> {
    const result = await this._conversationrepository.messageSave(
      senderId,
      recieverId,
      message,
      image
    );

    const messageDto: MessageDto = {
      _id: result._id?.toString(),
      senderId: result.senderId?.toString(),
      recieverId: result.recieverId?.toString(),
      message: result.message ?? undefined,
      image: result.image ?? undefined,
      messageType: result.messageType,
      read: result.read ?? false,
    };

    return messageDto;
  }
}
