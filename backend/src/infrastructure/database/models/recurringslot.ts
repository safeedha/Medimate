import {IRecurring} from '../../../domain/entities/Recurringslot';

import  { Schema, model } from 'mongoose';



const recurringSchema = new Schema<IRecurring>({

  doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },  // assuming doctor is another collection
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  frequency: { type: String, enum: ['WEEKLY', 'DAILY'], required: true },
  interval: { type: Number, default: 1 },  // e.g., every 1 week or 1 day
  daysOfWeek: {
    type: [{ type: String, enum: ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'] }],
    required: true,
  },
  starttime: { type: String, required: true } ,
  endttime: { type: String, required: true }   
},
{timestamps:true}
);

export const Recurring = model<IRecurring>('Recurring', recurringSchema);
