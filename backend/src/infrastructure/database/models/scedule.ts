import {IndividualSlot} from '../../../domain/entities/Sot'

import { Schema, model } from 'mongoose';

const individualSlotSchema = new Schema<IndividualSlot>({
  recurringSlotId: { type: Schema.Types.ObjectId, ref: 'Recurring', required: true },
  doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  startingTime:{type:String},
  endTime:{type:String},
  status: { type: String, enum: ["available", "booked", "cancelled"], default: "available" },
}, {
  timestamps: true // adds createdAt and updatedAt
});
export const Slot = model<IndividualSlot>('Slot', individualSlotSchema);