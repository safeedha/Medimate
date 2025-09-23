"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetfutureAppointment = void 0;
class GetfutureAppointment {
    constructor(_appointmentRepo) {
        this._appointmentRepo = _appointmentRepo;
    }
    async getfutureappoinment(userid, page, limit) {
        try {
            const result = await this._appointmentRepo.getfutureappoinment(userid, page, limit);
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
exports.GetfutureAppointment = GetfutureAppointment;
