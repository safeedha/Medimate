import mongoose, { Schema, model, } from 'mongoose';

const conversationSchema = new Schema(
  {
    participants: {
        type: [String],
        // refPath: 'participantsModel',
        // required: true,
    },
  
    // participantsModel: [
    //   {
    //     type: String,
    //     required: true,
    //     enum: ['User', 'Doctor'],
    //   },
    // ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export const ConversationModel = model('Conversation', conversationSchema);