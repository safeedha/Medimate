"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFilter = void 0;
class GetFilter {
    constructor(_appointmentRepo) {
        this._appointmentRepo = _appointmentRepo;
    }
    async getappoinmentrange(status, start, end) {
        try {
            const result = await this._appointmentRepo.getfilteredapooinment(status, start, end);
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
exports.GetFilter = GetFilter;
