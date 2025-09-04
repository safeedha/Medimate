
import {RatingDto} from '../../../dto/review.dto'
export interface IGetDoctorReviews {
  getreviews(
    doctorId: string,
    page: number,
    limit: number
  ): Promise<{ reviews: RatingDto[]; total: number}>;
}