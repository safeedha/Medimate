
import mongoose from 'mongoose';

const slotLockSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  slotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot', 
    required: true,
  },
  status: {
    type: String,
    enum: ['locked', 'confirmed', 'expired'],
    default: 'locked',
  },
  lockedAt: {
    type: Date,
    default: Date.now,
    expires: 300, 
  },
});


export const SlotLock =mongoose.model('SlotLock', slotLockSchema);

