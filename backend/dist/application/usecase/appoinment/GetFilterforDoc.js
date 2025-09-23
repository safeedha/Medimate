"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFilterfordoc = void 0;
class GetFilterfordoc {
    constructor(_appointmentRepo) {
        this._appointmentRepo = _appointmentRepo;
    }
    async getappoinmentrange(status, start, end, id) {
        try {
            const result = await this._appointmentRepo.getfilteredapooinmentfordoc(status, start, end, id);
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
exports.GetFilterfordoc = GetFilterfordoc;
