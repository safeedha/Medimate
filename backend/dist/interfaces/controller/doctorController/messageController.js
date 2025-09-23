"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const httpStatus_1 = require("../../../constant/httpStatus");
const httpessages_1 = require("../../../constant/httpessages");
class MessageController {
    constructor(_getAllMessagesUseCase, _deleteMessageUseCase, _getUnreadCountUseCase) {
        this._getAllMessagesUseCase = _getAllMessagesUseCase;
        this._deleteMessageUseCase = _deleteMessageUseCase;
        this._getUnreadCountUseCase = _getUnreadCountUseCase;
    }
    async fetchMessages(req, res, next) {
        try {
            const userId = req.id;
            const { sender } = req.query;
            if (typeof sender !== 'string') {
                res.status(httpStatus_1.HttpStatus.BAD_REQUEST).json({ message: httpessages_1.HttpMessage.INVALID_SENDER_OR_RECEIVER });
                return;
            }
            const result = await this._getAllMessagesUseCase.getallmessage(sender, userId);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async deleteMessage(req, res, next) {
        try {
            const { messageid } = req.params;
            const { sender, reciever } = req.query;
            if (typeof sender !== 'string' || typeof reciever !== 'string') {
                res.status(httpStatus_1.HttpStatus.BAD_REQUEST).json({ message: httpessages_1.HttpMessage.INVALID_SENDER_OR_RECEIVER });
                return;
            }
            const result = await this._deleteMessageUseCase.delete(messageid, sender, reciever);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async fetchUnreadCount(req, res, next) {
        try {
            const userId = req.id;
            const count = await this._getUnreadCountUseCase.getcount(userId);
            res.status(httpStatus_1.HttpStatus.OK).json(count);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.MessageController = MessageController;
