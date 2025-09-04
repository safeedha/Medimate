
import { IConversationRepository } from '../../domain/repository/ConversationRepository';
import {ConversationModel}  from '../database/models/conversation';
import {MessageModel} from '../database/models/message'
import { Message } from '../../domain/entities/Messages';
import {UnreadCounts} from '../../dto/message.dto'
import { Types } from 'mongoose';
import {Doctor} from '../database/models/docter';
import {User} from '../database/models/user';

export class MongoConversationRepo implements IConversationRepository {
  constructor() {
   
  }
   async getAllmessage(sender: string, receiver: string): Promise<Message[]> {
  try {
   
    await MessageModel.updateMany(
      { senderId: sender, recieverId: receiver, read: false },
      { $set: { read: true } }
    );

    const conversation = await ConversationModel.findOne({
      participants: { $all: [sender, receiver] },
    }).populate("messages");

    if (!conversation) {
      throw new Error("No conversation found");
    }

    return conversation.messages as unknown as Message[];
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message+"jhlkj")
      throw new Error(error.message);
    }
    throw new Error("Something happened");
  }
}

 


async  messagedelete(messageId: string, sender: string, receiver: string): Promise<string> {
  try {

    await MessageModel.deleteOne({ _id: messageId });

    const conversation = await ConversationModel.findOne({
      participants: { $all: [sender, receiver] },
    });

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    const objectId = new Types.ObjectId(messageId);
    conversation.messages = conversation.messages.filter((id) => !id.equals(objectId));
    await conversation.save();

    return 'Message deleted';
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Unexpected error occurred during delete message');
  }
}

  


  async changereadstatus(messageId:string): Promise<Message> {
  await MessageModel.updateOne(
    {_id:messageId},
    { $set: { read: true } } 
  );
   const message=await MessageModel.findOne({_id:messageId})
   if(!message)
   {
    throw new Error('message not found')
   }
   return message
}

  async messageSave(
  sender: string,
  reciever: string,
  message?: string,
  image?: string
): Promise<Message> {
  if (!message && !image) {
    throw new Error("Either message or image is required");
  }

  let newMessage;

  if (message) {
    newMessage = new MessageModel({
      senderId: sender,
      recieverId: reciever,
      messageType: 'text',
      message,
    });
  } else if (image) {
    newMessage = new MessageModel({
      senderId: sender,
      recieverId: reciever,
      messageType: 'image',
      image,
    });
  }

  let conversation = await ConversationModel.findOne({
    participants: { $all: [sender, reciever] },
  });

  if (!conversation) {
    conversation = await ConversationModel.create({
      participants: [sender, reciever],
    });
  }
    if (!newMessage) {
    throw new Error("Message creation failed unexpectedly");
  }
  const objectId = new Types.ObjectId(newMessage._id);
  conversation.messages.push(objectId);

   await Promise.all([conversation.save(), newMessage.save(),]);
  return newMessage;
}

async getcount(recieverId:string):Promise<Record<string, number>>{
  try{
    const count = await MessageModel.aggregate([
    { $match: { recieverId: recieverId, read: false } },
    { $group: { _id: "$senderId", count: { $sum: 1 } } }
  ])
   const result: UnreadCounts = {};
  count.forEach(item => {
    result[item._id] = item.count;
  });

  return result;
  }
  catch(error)
  {
     if (error instanceof Error) {     
        throw new Error(error.message); 
      }    
      throw new Error('Unexpected error occurred during doctor registration');
    }
  }


  async messagetimeaddfromdoc(sender: string, receiver: string): Promise<string> {
  try {
    const now = new Date();

    await Doctor.updateOne({ _id: sender }, { $set: { lastMessage: now } });
    await User.updateOne({ _id: receiver }, { $set: { lastMessage: now } });

    return 'message updated';
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Unexpected error occurred');
  }
}

async messagetimeaddfromuser(sender: string, receiver: string): Promise<string> {
  try {
    const now = new Date();

    await User.updateOne({ _id: sender }, { $set: { lastMessage: now } });
    await Doctor.updateOne({ _id: receiver }, { $set: { lastMessage: now } });

    return 'message updated';
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Unexpected error occurred');
  }
}

}


