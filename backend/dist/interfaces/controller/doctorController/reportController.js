"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const httpStatus_1 = require("../../../constant/httpStatus");
class ReportController {
    constructor(_addReport) {
        this._addReport = _addReport;
    }
    async addReportforAppoinment(req, res, next) {
        try {
            const { htmlcontent, appoinmentId, userId, medicine } = req.body;
            const report = await this._addReport.addReport(htmlcontent, appoinmentId, userId, medicine);
            res.status(httpStatus_1.HttpStatus.CREATED).json(report);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ReportController = ReportController;
