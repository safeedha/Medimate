import {IDoctorReview} from '../../domain/entities/review'
export interface ReviewRepository{
  createReview(data:IDoctorReview):Promise<string>
  getReview(doctorId:string,page:number,limit:number):Promise<{ reviews: IDoctorReview[]; total: number }>
  getAverageRating(doctorId: string): Promise<number>
}