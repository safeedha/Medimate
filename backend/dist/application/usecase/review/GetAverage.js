"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAverage = void 0;
class GetAverage {
    constructor(_reviewRepository) {
        this._reviewRepository = _reviewRepository;
    }
    async getaveragerating(doctorId) {
        try {
            const result = await this._reviewRepository.getAverageRating(doctorId);
            return result;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Some error happened');
        }
    }
}
exports.GetAverage = GetAverage;
