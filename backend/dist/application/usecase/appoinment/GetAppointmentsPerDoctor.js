"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAppointmentsPerDoctor = void 0;
class GetAppointmentsPerDoctor {
    constructor(_appointmentRepo) {
        this._appointmentRepo = _appointmentRepo;
    }
    async getcount(status) {
        try {
            const result = await this._appointmentRepo.getcountofappoinmentforeacdoc(status);
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
exports.GetAppointmentsPerDoctor = GetAppointmentsPerDoctor;
