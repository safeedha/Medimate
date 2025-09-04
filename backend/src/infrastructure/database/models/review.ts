import {IDoctorReview } from '../../../domain/entities/Review'

import mongoose, { Schema, model } from 'mongoose';

 const DoctorReviewSchema = new Schema<IDoctorReview >(
    {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, 
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
 );
export const Review = model<IDoctorReview >('Review',  DoctorReviewSchema );