"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorSlotController = void 0;
const httpStatus_1 = require("../../../constant/httpStatus");
class DoctorSlotController {
    constructor(_createSlot, _getRecurringSlots, _cancelRecurringSlot, _cancelSlot, _getSlotByDate, _editSlot) {
        this._createSlot = _createSlot;
        this._getRecurringSlots = _getRecurringSlots;
        this._cancelRecurringSlot = _cancelRecurringSlot;
        this._cancelSlot = _cancelSlot;
        this._getSlotByDate = _getSlotByDate;
        this._editSlot = _editSlot;
    }
    async cancelSingleSlot(req, res, next) {
        try {
            const { slotid } = req.params;
            const result = await this._cancelSlot.cancelSlot(slotid);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async cancelRecurringSlots(req, res, next) {
        try {
            const { id } = req.params;
            const result = await this._cancelRecurringSlot.cancelSlots(id);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getAllRecurringSlots(req, res, next) {
        try {
            const { id } = req;
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const result = await this._getRecurringSlots.getSlots(id, page, limit);
            console.log(result);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getDoctorSlotsByDate(req, res, next) {
        try {
            const { id } = req;
            const date = req.query.date;
            if (!date) {
                throw new Error('Date is required');
            }
            const result = await this._getSlotByDate.getSlotsByDate(id, new Date(date));
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async createRecurringSlot(req, res, next) {
        try {
            const { id } = req;
            const { startDate, endDate, selectedDays, startTime, endTime, interval, frequency } = req.body;
            const result = await this._createSlot.createSlots(id, startDate, endDate, selectedDays, startTime, endTime, interval, frequency);
            res.status(httpStatus_1.HttpStatus.CREATED).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async editRecurringSlot(req, res, next) {
        try {
            const { recId } = req.params;
            console.log('recid' + recId);
            const { id } = req;
            const { startDate, endDate, selectedDays, startTime, endTime, interval, frequency } = req.body;
            const result = await this._editSlot.editSlots(recId, id, startDate, endDate, selectedDays, startTime, endTime, interval, frequency);
            res.status(httpStatus_1.HttpStatus.CREATED).json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.DoctorSlotController = DoctorSlotController;
