
import {ConversationRepository} from '../../../domain/repository/conver-repo'


export class Messageread{
  constructor(private conversationrepository:ConversationRepository)
  {
   
  }
  async readmessage(senderId:string,recieverId:string):Promise<string>
  {
    const result=await this.conversationrepository.changereadstatus(senderId,recieverId)
    return result
  }

}