"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetdepartmentSummary = void 0;
class GetdepartmentSummary {
    constructor(_appointmentRepo) {
        this._appointmentRepo = _appointmentRepo;
    }
    async getsummary() {
        const summary = this._appointmentRepo.getdepartmentsummary();
        return summary;
    }
}
exports.GetdepartmentSummary = GetdepartmentSummary;
