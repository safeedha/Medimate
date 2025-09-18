import { IDoctorReview } from '../../../domain/entities/Review';
import { ICreateReview } from "../../../domain/useCaseInterface/review/ICreateReview";
import { IBaseRepository } from '../../../domain/repository/BaseRepository'
export class Createreview implements ICreateReview{
  constructor(private _baseRepository:IBaseRepository<IDoctorReview >) {}

  async create(id: string, comment: string, rating: number, doctorId: string): Promise<string> {
    try {
      const data: IDoctorReview = {
        doctorId: doctorId,
        userId: id,
        rating: rating,
        comment: comment
      };

      const result = await this._baseRepository.create(data);
      return "njkjnkj";
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Some error happened');
    }
  }
}
