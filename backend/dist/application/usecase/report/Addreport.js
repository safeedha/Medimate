"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Addreport = void 0;
class Addreport {
    constructor(_baseRepository) {
        this._baseRepository = _baseRepository;
    }
    async addReport(htmlcontent, appoinmentId, userId, medicine) {
        try {
            const report = await this._baseRepository.create({ content: htmlcontent, appointmentId: appoinmentId, userId, medicine });
            return "report created";
        }
        catch (error) {
            console.log(error);
            throw new Error('Could not save report');
        }
    }
}
exports.Addreport = Addreport;
