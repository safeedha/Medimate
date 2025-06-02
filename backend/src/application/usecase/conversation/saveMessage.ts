import {Conversation} from '../../../domain/entities/conversation'
import {ConversationRepository} from '../../../domain/repository/conver-repo'
import { Message } from '../../../domain/entities/messages';

export class SaveMessage{
  constructor(private conversationrepository:ConversationRepository)
  {
   
  }
  async MessageSave(senderId:string,recieverId:string,message:string):Promise<Message>
  {
    const result=await this.conversationrepository.messageSave(senderId,recieverId,message)
    return result
  }

}