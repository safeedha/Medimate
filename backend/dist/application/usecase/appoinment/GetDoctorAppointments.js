"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetdoctorAppointment = void 0;
class GetdoctorAppointment {
    constructor(_appointmentRepo) {
        this._appointmentRepo = _appointmentRepo;
    }
    async getallappoinment(doctorid, page, limit) {
        try {
            const result = await this._appointmentRepo.getappinmentbydoctor(doctorid, page, limit);
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
exports.GetdoctorAppointment = GetdoctorAppointment;
