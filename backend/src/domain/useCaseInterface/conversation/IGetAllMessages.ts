import { Message } from '../../entities/Messages';


export interface IGetAllMessages {
  getallmessage(receiverId: string, senderId: string): Promise<Message[]>; // You can specify the return type if known
}