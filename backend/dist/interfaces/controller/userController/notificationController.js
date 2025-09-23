"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const httpStatus_1 = require("../../../constant/httpStatus");
const httpessages_1 = require("../../../constant/httpessages");
class NotificationController {
    constructor(_getNotification, _readNotification) {
        this._getNotification = _getNotification;
        this._readNotification = _readNotification;
    }
    async getUnreadNotification(req, res, next) {
        try {
            const { id } = req;
            const result = await this._getNotification.getnotification(id);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async readAllNotification(req, res, next) {
        try {
            const { id } = req;
            await this._readNotification.readnotification(id);
            res.status(httpStatus_1.HttpStatus.OK).json({ message: httpessages_1.HttpMessage.NOTIFICATION_READE });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.NotificationController = NotificationController;
