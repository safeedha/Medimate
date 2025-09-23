"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Getreport = void 0;
class Getreport {
    constructor(_baseRepository) {
        this._baseRepository = _baseRepository;
    }
    async getreport(appId) {
        try {
            const report = await this._baseRepository.findById(appId);
            if (!report) {
                throw new Error("error occured during fetching");
            }
            const dto = {
                content: report.content,
                medicine: report.medicine.map((med) => ({
                    name: med.name,
                    dosage: med.dosage,
                    frequency: med.frequency,
                    duration: med.duration,
                    notes: med.notes ?? null,
                })),
            };
            return dto;
        }
        catch (error) {
            console.log(error);
            throw new Error('Could not fetch report');
        }
    }
}
exports.Getreport = Getreport;
