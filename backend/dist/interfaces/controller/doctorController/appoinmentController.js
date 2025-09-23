"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorAppointmentController = void 0;
const httpStatus_1 = require("../../../constant/httpStatus");
const emailservice_1 = require("../../../application/service/emailservice");
class DoctorAppointmentController {
    constructor(_getDoctorAppointments, _changeAppointmentStatus, _getSingleAppointment, _rescheduleAppointment, _getAppointmentCount, _getFilterService, _createFollowUp, _getPaginationData) {
        this._getDoctorAppointments = _getDoctorAppointments;
        this._changeAppointmentStatus = _changeAppointmentStatus;
        this._getSingleAppointment = _getSingleAppointment;
        this._rescheduleAppointment = _rescheduleAppointment;
        this._getAppointmentCount = _getAppointmentCount;
        this._getFilterService = _getFilterService;
        this._createFollowUp = _createFollowUp;
        this._getPaginationData = _getPaginationData;
    }
    async fetchAllAppointments(req, res, next) {
        try {
            const { id } = req;
            const page = parseInt(req.query.page, 10);
            const limit = parseInt(req.query.limit, 10);
            const appointments = await this._getDoctorAppointments.getallappoinment(id, page, limit);
            res.status(httpStatus_1.HttpStatus.OK).json({ appointments });
        }
        catch (error) {
            next(error);
        }
    }
    async createFollowUpAppointment(req, res, next) {
        try {
            const { slotId, appoinmentId } = req.body;
            const result = await this._createFollowUp.createfollowpappinment(slotId, appoinmentId);
            res.status(httpStatus_1.HttpStatus.CREATED).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async cancelAppointmentWithReason(req, res, next) {
        try {
            const { id } = req.params;
            const { reason, email } = req.body;
            const status = "cancelled";
            const result = await this._changeAppointmentStatus.changestus(id, status);
            await (0, emailservice_1.sendMail)(email, undefined, "Reason for Appointment Cancellation", reason);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async rescheduleAppointmentWithReason(req, res, next) {
        try {
            const { canceledslot, reason, email, newslot } = req.body;
            const status = "cancelled";
            await this._changeAppointmentStatus.changestus(canceledslot, status, true);
            const result = await this._rescheduleAppointment.createresedule(canceledslot, newslot);
            await (0, emailservice_1.sendMail)(email, undefined, "Reason for Appointment Cancellation", reason);
            res.status(httpStatus_1.HttpStatus.CREATED).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async markAppointmentCompleted(req, res, next) {
        try {
            const { id } = req.params;
            const status = "completed";
            const result = await this._changeAppointmentStatus.changestus(id, status);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getSingleAppointmentDetail(req, res, next) {
        try {
            const { id } = req.params;
            const result = await this._getSingleAppointment.getsingleappoinment(id);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getAppointmentsOverview(req, res, next) {
        try {
            const { id } = req;
            const result = await this._getAppointmentCount.getcountofappoinment(id);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getFilteredAppointments(req, res, next) {
        try {
            const { id } = req;
            const { status, start, end } = req.query;
            if (!status || !start || !end) {
                res.status(httpStatus_1.HttpStatus.BAD_REQUEST).json({ message: "Missing status, start, or end date" });
                return;
            }
            const startDate = new Date(start);
            const endDate = new Date(end);
            const result = await this._getFilterService.getappoinmentrange(status, startDate, endDate, id);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async paginateAppointments(req, res, next) {
        try {
            const { id } = req;
            const originalId = req.query.originalId;
            const limit = parseInt(req.query.limit, 10);
            const result = await this._getPaginationData.getpageforappoinment(id, originalId, limit);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.DoctorAppointmentController = DoctorAppointmentController;
