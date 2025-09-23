"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Getreview = void 0;
class Getreview {
    constructor(_reviewRepository) {
        this._reviewRepository = _reviewRepository;
    }
    async getreviews(doctorId, page, limit) {
        try {
            const result = await this._reviewRepository.getReview(doctorId, page, limit);
            const reviews = result.reviews.map((data) => ({
                rating: data.rating,
                comment: data.comment,
            }));
            return { reviews, total: result.total };
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Some error happened');
        }
    }
}
exports.Getreview = Getreview;
