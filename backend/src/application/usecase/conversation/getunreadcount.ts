import {ConversationRepository} from '../../../domain/repository/conver-repo'
import {UnreadCounts} from '../../../dto/message.dto'

export class Getunreadcount{
  constructor(private conversationrepository:ConversationRepository)
  {
   
  }
  async getcount(recieverId:string):Promise<UnreadCounts>
  {
    const result=await this.conversationrepository.getcount(recieverId)
    return result
  }

}