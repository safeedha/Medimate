import { IDoctorReview } from '../../../domain/entities/Review';
import { IReviewRepository } from '../../../domain/repository/ReviewRepository';
import { ICreateReview } from "../../../domain/useCaseInterface/review/ICreateReview";

export class Createreview implements ICreateReview{
  constructor(private reviewRepository: IReviewRepository) {}

  async create(id: string, comment: string, rating: number, doctorId: string): Promise<string> {
    try {
      const data: IDoctorReview = {
        doctorId: doctorId,
        userId: id,
        rating: rating,
        comment: comment
      };

      const result = await this.reviewRepository.createReview(data);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Some error happened');
    }
  }
}
