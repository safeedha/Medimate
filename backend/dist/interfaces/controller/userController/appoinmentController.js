"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentUserController = void 0;
const httpStatus_1 = require("../../../constant/httpStatus");
class AppointmentUserController {
    constructor(_getSlotByDate, _createAppointment, _getFutureAppointments, _changeAppointmentStatus, _createLockSlot, _getPaginationData, _getReport) {
        this._getSlotByDate = _getSlotByDate;
        this._createAppointment = _createAppointment;
        this._getFutureAppointments = _getFutureAppointments;
        this._changeAppointmentStatus = _changeAppointmentStatus;
        this._createLockSlot = _createLockSlot;
        this._getPaginationData = _getPaginationData;
        this._getReport = _getReport;
    }
    async createLockSlot(req, res, next) {
        try {
            const { slotid, doctorid } = req.body;
            const result = await this._createLockSlot.createLock(slotid, doctorid);
            res.status(httpStatus_1.HttpStatus.CREATED).json({ message: result });
        }
        catch (error) {
            next(error);
        }
    }
    async getDoctorSlotsByDate(req, res, next) {
        try {
            const { id } = req.params;
            const date = req.query.date;
            if (!date) {
                res.status(httpStatus_1.HttpStatus.BAD_REQUEST).json({ message: 'Date is required' });
                return;
            }
            const result = await this._getSlotByDate.getSlotsByDate(id, new Date(date));
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async bookAppointment(req, res, next) {
        try {
            const userId = req.id;
            const { doctorId, slot, name, email, age, gender, reason, amount } = req.body;
            const result = await this._createAppointment.createAppointment(userId, doctorId, slot, name, email, age, gender, reason, amount);
            res.status(httpStatus_1.HttpStatus.CREATED).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async fetchFutureAppointments(req, res, next) {
        try {
            const userId = req.id;
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const result = await this._getFutureAppointments.getfutureappoinment(userId, page, limit);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async fetchAppointmentPages(req, res, next) {
        try {
            const userId = req.id;
            const originalId = req.query.originalId;
            const limit = parseInt(req.query.limit);
            const result = await this._getPaginationData.getpageforappoinment(userId, originalId, limit);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async cancelAppointment(req, res, next) {
        try {
            const { appoinmentid } = req.body;
            const status = 'cancelled';
            const result = await this._changeAppointmentStatus.changestus(appoinmentid, status);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async reportGet(req, res, next) {
        try {
            const { appId } = req.params;
            const result = await this._getReport.getreport(appId);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AppointmentUserController = AppointmentUserController;
