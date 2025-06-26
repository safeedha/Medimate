import { IDoctorReview } from '../../../domain/entities/review';
import { ReviewRepository } from '../../../domain/repository/reviewrepository';

export class Getreview {
  constructor(private reviewRepository: ReviewRepository) {}

  async getreviews(
    doctorId: string,
    page: number,
    limit: number
  ): Promise<{ reviews: IDoctorReview[]; total: number}> {
    try {
      const result = await this.reviewRepository.getReview(doctorId, page, limit);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Some error happened');
    }
  }
}
