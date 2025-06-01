import {Conversation} from '../../../domain/entities/conversation'
import {ConversationRepository} from '../../../domain/repository/conver-repo'
import { Message } from '../../../domain/entities/messages';

export class GetAllmessage{
  constructor(private conversationrepository:ConversationRepository){

  }
  async getallmessage(sender:string,receiver:string):Promise<Message[]>{
    try{
      const result=await this.conversationrepository.getAllmessage(sender,receiver)
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