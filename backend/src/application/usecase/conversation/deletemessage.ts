
import {IConversationRepository} from '../../../domain/repository/ConversationRepository'

import { IDeleteMessage} from '../../../domain/useCaseInterface/conversation/IDeleteMessage';

export class Deletemessage implements IDeleteMessage{
  constructor(private conversationrepository:IConversationRepository){

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