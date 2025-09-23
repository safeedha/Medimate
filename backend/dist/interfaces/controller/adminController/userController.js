"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const httpStatus_1 = require("../../../constant/httpStatus");
class UserController {
    constructor(_getUser, _changeStatus, _getSingleUser) {
        this._getUser = _getUser;
        this._changeStatus = _changeStatus;
        this._getSingleUser = _getSingleUser;
    }
    async getAllUsers(req, res, next) {
        try {
            const page = parseInt(req.query.page, 10);
            const limit = parseInt(req.query.limit, 10);
            const search = req.query.search;
            const result = await this._getUser.getAllUser(page, limit, search);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async toggleUserBlockStatus(req, res, next) {
        try {
            const { id } = req.params;
            const result = await this._changeStatus.changesatus(id);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getSingleUser(req, res, next) {
        try {
            const { id } = req.params;
            const result = await this._getSingleUser.getsingleUser(id);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UserController = UserController;
