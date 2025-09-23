"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorController = void 0;
const httpStatus_1 = require("../../../constant/httpStatus");
class DoctorController {
    constructor(_getSingleDoctor, _getVerifiedDoctors, _getSortedDoctors, _updateMessagetime) {
        this._getSingleDoctor = _getSingleDoctor;
        this._getVerifiedDoctors = _getVerifiedDoctors;
        this._getSortedDoctors = _getSortedDoctors;
        this._updateMessagetime = _updateMessagetime;
    }
    async fetchAllVerifiedDoctors(req, res, next) {
        try {
            const department = req.query.department;
            const search = req.query.search;
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const experience = req.query.experience;
            const result = await this._getVerifiedDoctors.getAllVerifiedDoctors(page, limit, department, search, experience);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async fetchSortedDoctors(req, res, next) {
        try {
            const search = req.query.search;
            const result = await this._getSortedDoctors.getAllDoctors(search);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async fetchSingleDoctor(req, res, next) {
        try {
            const { id } = req.params;
            const doctor = await this._getSingleDoctor.getsingledoc(id);
            res.status(httpStatus_1.HttpStatus.OK).json(doctor);
        }
        catch (error) {
            next(error);
        }
    }
    async updatemessagetime(req, res, next) {
        try {
            const { id } = req;
            const { reciever } = req.params;
            const result = await this._updateMessagetime.update(id, reciever);
            res.status(httpStatus_1.HttpStatus.CREATED).json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.DoctorController = DoctorController;
