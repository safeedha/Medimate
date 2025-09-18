
import { IReviewRepository } from '../../../domain/repository/ReviewRepository';
import { IGetDoctorReviews } from "../../../domain/useCaseInterface/review/IGetDoctorReviews";
import { RatingDto } from '../../../dto/review.dto';

export class Getreview implements IGetDoctorReviews {
  constructor(private _reviewRepository: IReviewRepository) {}

  async getreviews(
    doctorId: string,
    page: number,
    limit: number
  ): Promise<{ reviews: RatingDto[]; total: number }> {
    try {
      const result = await this._reviewRepository.getReview(doctorId, page, limit);

      const reviews: RatingDto[] = result.reviews.map((data) => ({
        rating: data.rating,
        comment: data.comment,
      }));

      return { reviews, total: result.total };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Some error happened');
    }
  }
}
