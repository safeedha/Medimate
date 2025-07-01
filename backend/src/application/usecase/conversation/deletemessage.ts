import {Conversation} from '../../../domain/entities/conversation'
import {ConversationRepository} from '../../../domain/repository/conver-repo'
import { Message } from '../../../domain/entities/messages';

export class Deletemessage{
  constructor(private conversationrepository:ConversationRepository){

  }
  async delete(messageId:string,sender:string,reciever:string):Promise<string>{
    try{
      
      const result=await this.conversationrepository.messagedelete(messageId,sender,reciever)
      return result
    }
    catch(error)
    {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}