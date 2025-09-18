import { Schema, model } from 'mongoose';
import {IUser} from '../../../domain/entities/User'


const UserSchema: Schema<IUser> = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String},
    email: { type: String, required: true},
    password: { type: String },
    phone: { type: String,default: null },
    googleIds: { type: String, default: null },
    isBlocked: { type: Boolean, required: true, default: false },
    googleVerified: { type: Boolean, default: false },
    lastMessage:{type:Date,default:Date.now},
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
     age: {
      type: Number,
    },
  },
  {
    timestamps: true, 
  }
);

export const User = model<IUser>('User', UserSchema);