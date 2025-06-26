import { IDoctorReview } from '../../../domain/entities/review';
import { ReviewRepository } from '../../../domain/repository/reviewrepository';

export class GetAverage{
  constructor(private reviewRepository: ReviewRepository) {}

  async getaveragerating(doctorId: string): Promise<number> {
    try {
      const result = await this.reviewRepository.getAverageRating(doctorId);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Some error happened');
    }
  }
}
