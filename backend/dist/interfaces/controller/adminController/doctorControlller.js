"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorController = void 0;
const httpStatus_1 = require("../../../constant/httpStatus");
class DoctorController {
    constructor(_getUnverified, _changeDoctorStatus, _verifyDoctor, _getSingleDoctor, _getAllDoctor) {
        this._getUnverified = _getUnverified;
        this._changeDoctorStatus = _changeDoctorStatus;
        this._verifyDoctor = _verifyDoctor;
        this._getSingleDoctor = _getSingleDoctor;
        this._getAllDoctor = _getAllDoctor;
    }
    async getAllUnverifiedDoctors(req, res, next) {
        try {
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const result = await this._getUnverified.getAllUnverifiedDoctors(page, limit);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getAllDoctors(req, res, next) {
        try {
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const search = req.query.search;
            const result = await this._getAllDoctor.getAlldoctors(page, limit, search);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getSingleDoctordetails(req, res, next) {
        try {
            const { doctorId } = req.params;
            const result = await this._getSingleDoctor.getsingledoc(doctorId);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async toggleDoctorBlockStatus(req, res, next) {
        try {
            const { id } = req.params;
            const result = await this._changeDoctorStatus.changesatus(id);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async updateVerificationStatus(req, res, next) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const reason = req.query.reason;
            const result = await this._verifyDoctor.verifyStatus(id, status, reason);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.DoctorController = DoctorController;
