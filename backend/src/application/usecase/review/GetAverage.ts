
import { IReviewRepository } from '../../../domain/repository/ReviewRepository';
import {IGetAverageRating } from "../../../domain/useCaseInterface/review/IGetAverageRating";
export class GetAverage implements IGetAverageRating{
  constructor(private _reviewRepository: IReviewRepository) {}

  async getaveragerating(doctorId: string): Promise<number> {
    try {
      const result = await this._reviewRepository.getAverageRating(doctorId);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Some error happened');
    }
  }
}
