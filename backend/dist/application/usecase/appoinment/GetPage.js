"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPage = void 0;
class GetPage {
    constructor(_appointmentRepo) {
        this._appointmentRepo = _appointmentRepo;
    }
    async getpageforappoinment(id, originalId, limit) {
        try {
            const result = await this._appointmentRepo.getpageforId(id, originalId, limit);
            return result;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("Error in fetching appointment overview");
        }
    }
}
exports.GetPage = GetPage;
