import { Schema, model, connect } from 'mongoose';
import {Iuser} from '../../../doamin/entities/user'


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
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
  },
  {
    timestamps: true, 
  }
);

export const User = model<Iuser>('User', UserSchema);