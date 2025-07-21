import mongoose, { Schema, Document } from "mongoose";

const NotificationSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: false,
    },
    type: {
      type: String,
      enum: ["consultation" , "cancellation" , "refund" , "reschedule","followup"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);


export const Notification = mongoose.model("Notification", NotificationSchema);



