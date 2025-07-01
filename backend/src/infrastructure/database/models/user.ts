import { Schema, model, connect } from 'mongoose';
import {Iuser} from '../../../domain/entities/user'


const UserSchema: Schema<Iuser> = new Schema(
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

export const User = model<Iuser>('User', UserSchema);