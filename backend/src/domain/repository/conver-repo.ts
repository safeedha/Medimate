import {Conversation} from '../entities/conversation'
import {Message} from '../entities/messages'
import {UnreadCounts} from '../../dto/message.dto'

export interface ConversationRepository {
  getAllmessage(sender:string,receiver:string):Promise<Message[]>
  messageSave(sender:string,reciever:string,message?:string,image?:string):Promise<Message>
  changereadstatus(messageId:string): Promise<Message>
  getcount(recieverId:string):Promise<UnreadCounts>
  messagedelete(messageId:string,sender:string,reciever:string):Promise<string>
  messagetimeaddfromdoc(sender:string,reciever:string):Promise<string>
  messagetimeaddfromuser(sender: string, receiver: string): Promise<string>
}