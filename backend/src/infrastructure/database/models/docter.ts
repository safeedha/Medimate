import { Schema, model } from 'mongoose';
import {Idoctor} from '../../../doamin/entities/doctor'


const DoctorSchema: Schema<Idoctor> = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    specialisation: {  type: Schema.Types.ObjectId, ref: 'Department'},
    experience: { type: Number, required: true },
    fee: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Approved', 'Rejected', 'Pending'],
      required: true,
    },
    isBlocked: { type: Boolean, default: false },
    googleVerified:{type: Boolean, default: false},
    additionalInfo: { type: String },
    profilePicture: { type: String },
    medicalLicence: { type: String },
  },
  {
    timestamps: true, 
  }
);


export const Doctor = model<Idoctor>('Doctor', DoctorSchema);