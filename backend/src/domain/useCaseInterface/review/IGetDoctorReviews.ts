import { IDoctorReview } from '../../../domain/entities/review';
export interface IGetDoctorReviews {
  getreviews(
    doctorId: string,
    page: number,
    limit: number
  ): Promise<{ reviews: IDoctorReview[]; total: number}>;
}