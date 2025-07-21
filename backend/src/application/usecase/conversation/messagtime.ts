
import {ConversationRepository} from '../../../domain/repository/conver-repo'
import {IUpdateMessagetime} from '../../../domain/useCaseInterface/conversation/IUpdateMessagetime';


export class MessageTimeUpdation implements IUpdateMessagetime{
  constructor(private conversationrepository:ConversationRepository){

  }
  async update(sender:string,reciever:string):Promise<string>{
    try{
      
      const result=await this.conversationrepository.messagetimeaddfromdoc(sender,reciever)
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