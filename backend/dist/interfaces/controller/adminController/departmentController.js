"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentController = void 0;
const httpStatus_1 = require("../../../constant/httpStatus");
class DepartmentController {
    constructor(_addDept, _getDept, _editDept, _blockDept) {
        this._addDept = _addDept;
        this._getDept = _getDept;
        this._editDept = _editDept;
        this._blockDept = _blockDept;
    }
    async createDepartment(req, res, next) {
        try {
            const { deptname, description } = req.body;
            const result = await this._addDept.addDept({ deptname, description });
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getDepartment(req, res, next) {
        try {
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const search = req.query.search;
            const result = await this._getDept.getAllDept(page, limit, search);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async editDepartment(req, res, next) {
        try {
            const { id } = req.params;
            const { deptname, description } = req.body;
            const data = { _id: id, deptname, description };
            console.log(data);
            const result = await this._editDept.editDept(data);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async blockDepartment(req, res, next) {
        try {
            const { id } = req.params;
            const result = await this._blockDept.blockDept(id);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.DepartmentController = DepartmentController;
