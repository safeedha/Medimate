import {Conversation} from '../../../domain/entities/conversation'
import {ConversationRepository} from '../../../domain/repository/conver-repo'


export class SaveMessage{
  constructor(private conversationrepository:ConversationRepository)
  {
   
  }
  async MessageSave(senderId:string,recieverId:string,message:string)
  {
    const result=await this.conversationrepository.messageSave(senderId,recieverId,message)
  }

}