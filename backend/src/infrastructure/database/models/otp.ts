import {IOtp} from '../../../doamin/entities/otp';
import mongoose, { Schema, Document } from 'mongoose';
const otpSchema: Schema<IOtp> = new Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 
  }
});

export const Otp = mongoose.model<IOtp>('Otp', otpSchema);