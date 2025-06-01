import { Schema, model } from 'mongoose';
import { Message } from '../../../domain/entities/messages';

const messageSchema = new Schema<Message>(
  {
    senderId: {
      type: String,
      required: true,
      // refPath: 'senderModel',
    },
    recieverId: {
      type: String,
      required: true,
      // refPath: 'recieverModel',
    },
    message: {
      type: String,
      required: true,
    },
    // senderModel: {
    //   type: String,
    //   required: true,
    //   enum: ['User', 'Doctor'],
    // },
    // recieverModel: {
    //   type: String,
    //   required: true,
    //   enum: ['User', 'Doctor'],
    // },
  },
  { timestamps: true }
);

export const MessageModel = model<Message>('Message', messageSchema);


