"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Createreview = void 0;
class Createreview {
    constructor(_baseRepository) {
        this._baseRepository = _baseRepository;
    }
    async create(id, comment, rating, doctorId) {
        try {
            const data = {
                doctorId: doctorId,
                userId: id,
                rating: rating,
                comment: comment
            };
            const result = await this._baseRepository.create(data);
            return "njkjnkj";
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Some error happened');
        }
    }
}
exports.Createreview = Createreview;
