import { Schema, model } from 'mongoose';
import { Message } from '../../../domain/entities/messages';

const messageSchema = new Schema<Message>(
  {
    
    senderId: {
      type: String,
      required: true,
    },
    recieverId: {
      type: String,
      required: true,
    },
    messageType: {
      type: String,
      enum: ['text', 'image'],
      required: true,
    },
    message: {
      type: String,
      required: function () {
        return this.messageType === 'text';
      },
    },
    image: {
      type: String,
      required: function () {
        return this.messageType === 'image';
      },
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const MessageModel = model<Message>('Message', messageSchema);


