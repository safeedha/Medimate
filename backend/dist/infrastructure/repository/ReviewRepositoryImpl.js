"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoReviewRepository = void 0;
const review_1 = require("../database/models/review");
const mongoose_1 = __importDefault(require("mongoose"));
const BaseRepositoryImpl_1 = require("./BaseRepositoryImpl");
class MongoReviewRepository extends BaseRepositoryImpl_1.BaseRepository {
    constructor() {
        super();
    }
    async create(data) {
        try {
            const review = new review_1.Review(data);
            await review.save();
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Failed to create review');
        }
    }
    async getReview(doctorId, page, limit) {
        try {
            const skip = (page - 1) * limit;
            const reviews = await review_1.Review.find({ doctorId })
                .populate('userId')
                .skip(skip)
                .limit(limit);
            const total = await review_1.Review.countDocuments({ doctorId });
            return { reviews, total };
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Failed to fetch reviews');
        }
    }
    async getAverageRating(doctorId) {
        try {
            const result = await review_1.Review.aggregate([
                { $match: { doctorId: new mongoose_1.default.Types.ObjectId(doctorId) } },
                {
                    $group: {
                        _id: null,
                        averageRating: { $avg: '$rating' }
                    }
                }
            ]);
            return result[0]?.averageRating || 0;
        }
        catch (error) {
            console.log(error);
            throw new Error('Failed to calculate average rating');
        }
    }
}
exports.MongoReviewRepository = MongoReviewRepository;
