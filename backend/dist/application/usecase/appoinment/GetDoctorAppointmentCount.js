"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetdoctorAppointmentCount = void 0;
class GetdoctorAppointmentCount {
    constructor(_appointmentRepo) {
        this._appointmentRepo = _appointmentRepo;
    }
    async getcountofappoinment(doctorid) {
        try {
            const result = await this._appointmentRepo.getcountofappoinmentofdoctor(doctorid);
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
exports.GetdoctorAppointmentCount = GetdoctorAppointmentCount;
