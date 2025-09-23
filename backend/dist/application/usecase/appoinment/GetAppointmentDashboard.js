"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDashbordappoinment = void 0;
class GetDashbordappoinment {
    constructor(_appointmentRepo) {
        this._appointmentRepo = _appointmentRepo;
    }
    async getoverview() {
        try {
            const result = await this._appointmentRepo.getdetails();
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
exports.GetDashbordappoinment = GetDashbordappoinment;
