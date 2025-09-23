"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetpastAppointment = void 0;
class GetpastAppointment {
    constructor(_appointmentRepo) {
        this._appointmentRepo = _appointmentRepo;
    }
    async getpastappoinment(userid) {
        try {
            const result = await this._appointmentRepo.getpastappoinment(userid);
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
exports.GetpastAppointment = GetpastAppointment;
