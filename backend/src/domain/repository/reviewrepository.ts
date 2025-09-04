import {IDoctorReview} from '../entities/Review'
export interface IReviewRepository{
  createReview(data:IDoctorReview):Promise<string>
  getReview(doctorId:string,page:number,limit:number):Promise<{ reviews: IDoctorReview[]; total: number }>
  getAverageRating(doctorId: string): Promise<number>
}