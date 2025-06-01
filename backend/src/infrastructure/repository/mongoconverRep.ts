import { Conversation } from '../../domain/entities/conversation';
import { ConversationRepository } from '../../domain/repository/conver-repo';
import {ConversationModel}  from '../database/models/conversation';
import {MessageModel} from '../database/models/message'
import { Message } from '../../domain/entities/messages';

export class MongoConversationRepo implements ConversationRepository {
  constructor() {
   
  }
  async getAllmessage(sender:string,receiver:string):Promise<Message[]>{
    try{
       const conversation = await ConversationModel.findOne({
     participants: { $all: [sender, receiver] },
   }).populate("messages");

    if (!conversation) {
    throw new Error("No conversation found");
    }

     return conversation.messages as unknown as Message[];

    }
    catch(error)
    {
       if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Something happened");
    }
  }

  async messageSave(
  sender: string,
  reciever: string,
  message: string,
): Promise<Message> {
  const newMessage = new MessageModel({
    senderId: sender,
    recieverId: reciever,
    message,

  });
  	let conversation = await ConversationModel.findOne({
			participants: { $all: [sender, reciever] },
		});

		if (!conversation) {
			conversation = await ConversationModel.create({
				participants: [sender, reciever],
			});
		}
    if(newMessage)
    {
  
			conversation.messages.push(newMessage._id);
		
    }
  await Promise.all([conversation.save(), newMessage.save()]);

  return newMessage
}
 
}
