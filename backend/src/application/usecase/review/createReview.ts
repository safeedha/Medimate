import { IDoctorReview } from '../../../domain/entities/review';
import { ReviewRepository } from '../../../domain/repository/reviewrepository';

export class Createreview {
  constructor(private reviewRepository: ReviewRepository) {}

  async create(id: string, comment: string, rating: number, doctorId: string): Promise<string> {
    try {
      const data: IDoctorReview = {
        doctorId: doctorId,
        userId: id,
        rating: rating,
        comment: comment
      };

      const result = await this.reviewRepository.createReview(data);
      return result; // Assuming the repository returns a string like "Review created" or an ID
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Some error happened');
    }
  }
}
