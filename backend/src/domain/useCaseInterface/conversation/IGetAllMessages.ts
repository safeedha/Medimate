import { Message } from '../../../domain/entities/messages';


export interface IGetAllMessages {
  getallmessage(receiverId: string, senderId: string): Promise<Message[]>; // You can specify the return type if known
}