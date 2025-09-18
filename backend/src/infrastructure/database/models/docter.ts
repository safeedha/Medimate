import { Schema, model } from 'mongoose';
import {IDoctor} from '../../../domain/entities/Doctor'


const DoctorSchema: Schema<IDoctor> = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    specialisation: { type: Schema.Types.ObjectId, ref: 'Department' },
    experienceDetail: {
      type: [
        {
          hospitalName: { type: String, required: true },
          role: { type: String, required: true },
          years: { type: String, required: true },
        }
      ],
      default: []
   },

    experience: { type: Number, required: true },

    fee: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Approved', 'Rejected', 'Pending'],
      required: true,
    },
    isBlocked: { type: Boolean, default: false },
    googleVerified: { type: Boolean, default: false },
    qualification: { type: String },
    additionalInfo: { type: String },
    profilePicture: { type: String },
    medicalLicence: { type: String },
    lastMessage: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);
export const Doctor = model<IDoctor>('Doctor', DoctorSchema);