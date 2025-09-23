"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSingleappoinment = void 0;
class GetSingleappoinment {
    constructor(_baseRepository) {
        this._baseRepository = _baseRepository;
    }
    async getsingleappoinment(id) {
        try {
            const result = await this._baseRepository.findById(id);
            if (!result) {
                throw new Error("Failed to fetch single appointment");
            }
            return result;
        }
        catch (error) {
            if (error instanceof Error) {
                throw Error(error.message);
            }
            throw Error("error in fetching");
        }
    }
}
exports.GetSingleappoinment = GetSingleappoinment;
