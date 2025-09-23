"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetdoctorAppointmentByid = void 0;
class GetdoctorAppointmentByid {
    constructor(_appointmentRepo) {
        this._appointmentRepo = _appointmentRepo;
    }
    async getallappoinment(doctorid) {
        try {
            const result = await this._appointmentRepo.getallappinmentfordoctor(doctorid);
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
exports.GetdoctorAppointmentByid = GetdoctorAppointmentByid;
