"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const httpStatus_1 = require("../../../constant/httpStatus");
class ReviewController {
    constructor(_createReviewUseCase, _getAverageUseCase, _getReviewUseCase) {
        this._createReviewUseCase = _createReviewUseCase;
        this._getAverageUseCase = _getAverageUseCase;
        this._getReviewUseCase = _getReviewUseCase;
    }
    async submitReview(req, res, next) {
        try {
            const userId = req.id;
            const { comment, rating, doctorId } = req.body;
            const result = await this._createReviewUseCase.create(userId, comment, rating, doctorId);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async fetchAverageRating(req, res, next) {
        try {
            const doctorId = req.query.doctorId;
            const result = await this._getAverageUseCase.getaveragerating(doctorId);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async fetchDoctorReviews(req, res, next) {
        try {
            const doctorId = req.query.doctorId;
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const result = await this._getReviewUseCase.getreviews(doctorId, page, limit);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ReviewController = ReviewController;
