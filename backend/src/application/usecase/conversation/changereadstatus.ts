
import {ConversationRepository} from '../../../domain/repository/conver-repo'
import {Message} from '../../../domain/entities/messages'


export class Messageread{
  constructor(private conversationrepository:ConversationRepository)
  {
   
  }
  async readmessage(messageId:string):Promise<Message>
  {
    const result=await this.conversationrepository.changereadstatus(messageId)
    return result
  }

}