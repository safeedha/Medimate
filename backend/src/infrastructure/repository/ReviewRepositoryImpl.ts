import { IReviewRepository } from '../../domain/repository/ReviewRepository';
import { IDoctorReview } from '../../domain/entities/Review'; 
import {Review} from '../database/models/review';
import mongoose from 'mongoose';

export class MongoReviewRepository implements IReviewRepository {
  constructor() {}

  async createReview(data: IDoctorReview): Promise<string> {
    try {
      const review=new Review(data)
      await review.save()
      return 'Review created successfully';
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Failed to create review');
    }
  }
async getReview(
  doctorId: string,
  page: number,
  limit: number
): Promise<{ reviews: IDoctorReview[]; total: number }> {
  try {
    const skip = (page - 1) * limit;

    // Fetch paginated reviews
    const reviews = await Review.find({ doctorId })
      .populate('userId')
      .skip(skip)
      .limit(limit);
    const total = await Review.countDocuments({ doctorId });

    return { reviews, total };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch reviews');
  }
}
async getAverageRating(doctorId: string): Promise<number> {
  try {
    const result = await Review.aggregate([
      { $match: { doctorId: new mongoose.Types.ObjectId(doctorId) } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' }
        }
      }
    ]);

    return result[0]?.averageRating || 0;
  } catch (error) {
    console.log(error)
    throw new Error('Failed to calculate average rating');
  }
}
}
