import {Conversation} from '../entities/conversation'
import {Message} from '../entities/messages'

export interface ConversationRepository {
  getAllmessage(sender:string,receiver:string):Promise<Message[]>
  messageSave(sender:string,reciever:string,message:string):Promise<Message>
}