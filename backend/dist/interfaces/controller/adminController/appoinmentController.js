"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentController = void 0;
const httpStatus_1 = require("../../../constant/httpStatus");
const httpessages_1 = require("../../../constant/httpessages");
class AppointmentController {
    constructor(_getDashboardAppointment, _getCountOfAppointmentsForDoctor, _getFilteredAppointment, _getDepartmentSummary) {
        this._getDashboardAppointment = _getDashboardAppointment;
        this._getCountOfAppointmentsForDoctor = _getCountOfAppointmentsForDoctor;
        this._getFilteredAppointment = _getFilteredAppointment;
        this._getDepartmentSummary = _getDepartmentSummary;
    }
    async getDashboardOverview(req, res, next) {
        try {
            const result = await this._getDashboardAppointment.getoverview();
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getDepartmentsummary(req, res, next) {
        try {
            const result = await this._getDepartmentSummary.getsummary();
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getAppointmentCountByStatus(req, res, next) {
        try {
            const { status } = req.query;
            if (typeof status !== 'string' || !['completed', 'pending', 'cancelled'].includes(status)) {
                res.status(httpStatus_1.HttpStatus.BAD_REQUEST).json({ message: httpessages_1.HttpMessage.INVALID_STATUS });
                return;
            }
            const result = await this._getCountOfAppointmentsForDoctor.getcount(status);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getAppointmentsByDateRange(req, res, next) {
        try {
            const { status, start, end } = req.query;
            if (!status || !start || !end) {
                res.status(httpStatus_1.HttpStatus.BAD_REQUEST).json({ message: httpessages_1.HttpMessage.MISSING_FIELDS });
                return;
            }
            const startDate = new Date(start);
            const endDate = new Date(end);
            const result = await this._getFilteredAppointment.getappoinmentrange(status, startDate, endDate);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AppointmentController = AppointmentController;
