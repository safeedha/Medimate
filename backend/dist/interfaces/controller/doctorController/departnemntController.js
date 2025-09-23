"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentController = void 0;
const httpStatus_1 = require("../../../constant/httpStatus");
class DepartmentController {
    constructor(_getAllUnblockedDept, _getDepartment) {
        this._getAllUnblockedDept = _getAllUnblockedDept;
        this._getDepartment = _getDepartment;
    }
    async fetchAllUnblockedDepartments(req, res, next) {
        try {
            const departments = await this._getAllUnblockedDept.getAllunblockedDept();
            res.status(httpStatus_1.HttpStatus.OK).json(departments);
        }
        catch (error) {
            next(error);
        }
    }
    async fetchAllDepartments(req, res, next) {
        try {
            const departments = await this._getDepartment.getAllDept();
            res.status(httpStatus_1.HttpStatus.OK).json(departments);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.DepartmentController = DepartmentController;
