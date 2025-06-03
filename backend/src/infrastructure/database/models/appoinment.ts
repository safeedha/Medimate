import { Schema, model } from 'mongoose';
import { Appointment } from '../../../domain/entities/appoinment';

const AppointmentSchema = new Schema<Appointment>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  doctor_id: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  schedule_id: {
    type: Schema.Types.ObjectId,
    ref: 'Slot',
    required: true,
  },

  patient_name: {
    type: String,
    required: true,
  },
  patient_email: {
    type: String,
    required: true,
  },
  patient_age: {
    type: Number,
    required: true,
  },
  patient_gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  payment_status: {
    type: String,
    enum: ['paid', 'unpaid'],
    default: 'unpaid',
  },
    reportAdded:{
    type:Boolean,
    default:false
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

export const AppointmentModel = model<Appointment>('Appointment', AppointmentSchema);

