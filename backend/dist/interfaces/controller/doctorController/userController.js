"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManagementController = void 0;
const httpStatus_1 = require("../../../constant/httpStatus");
class UserManagementController {
    constructor(_getUserBysort, _updateMessagetime) {
        this._getUserBysort = _getUserBysort;
        this._updateMessagetime = _updateMessagetime;
    }
    async getAllUsers(req, res, next) {
        try {
            const search = req.query.search || '';
            const users = await this._getUserBysort.getAllSortUser(search);
            res.status(httpStatus_1.HttpStatus.OK).json(users);
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
exports.UserManagementController = UserManagementController;
