import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  dosage:    { type: String, required: true },
  frequency: { type: String, required: true },
  duration:  { type: String, required: true },
  notes:     { type: String } // optional
}, { _id: false });

const reportSchema = new mongoose.Schema({
  content: {
    type: String, 
    required: true,
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  medicine: [medicineSchema],  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Report = mongoose.model('Report', reportSchema);
