
import {Message} from '../entities/Messages'


export interface IConversationRepository {
  getAllmessage(sender:string,receiver:string):Promise<Message[]>
  messageSave(sender:string,reciever:string,message?:string,image?:string):Promise<Message>
  changereadstatus(messageId:string): Promise<Message>
  getcount(recieverId:string):Promise<Record<string, number>>
  messagedelete(messageId:string,sender:string,reciever:string):Promise<string>
  messagetimeaddfromdoc(sender:string,reciever:string):Promise<string>
  messagetimeaddfromuser(sender: string, receiver: string): Promise<string>
}