import { Request, Response, NextFunction } from 'express';
import { ICreateReview } from "../../../domain/useCaseInterface/review/ICreateReview";
import { IGetAverageRating } from "../../../domain/useCaseInterface/review/IGetAverageRating";
import { IGetDoctorReviews } from "../../../domain/useCaseInterface/review/IGetDoctorReviews";
import { HttpStatus } from "../../../constant/httpStatus";

interface CustomRequest extends Request {
  id: string;
}

export class ReviewController {
  constructor(
    private readonly _createReviewUseCase: ICreateReview,
    private readonly _getAverageUseCase: IGetAverageRating,
    private readonly _getReviewUseCase: IGetDoctorReviews
  ) {}

  async submitReview(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.id;
      const { comment, rating, doctorId } = req.body;
      const result = await this._createReviewUseCase.create(userId, comment, rating, doctorId);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async fetchAverageRating(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const doctorId = req.query.doctorId as string;
      const result = await this._getAverageUseCase.getaveragerating(doctorId);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async fetchDoctorReviews(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const doctorId = req.query.doctorId as string;
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);
      const result = await this._getReviewUseCase.getreviews(doctorId, page, limit);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}
