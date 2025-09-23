"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationController = void 0;
const httpStatus_1 = require("../../../constant/httpStatus");
const httpessages_1 = require("../../../constant/httpessages");
class ConversationController {
    constructor(_getAllMessagesService, _getUnreadCountService, _deleteMessageService) {
        this._getAllMessagesService = _getAllMessagesService;
        this._getUnreadCountService = _getUnreadCountService;
        this._deleteMessageService = _deleteMessageService;
    }
    async fetchMessages(req, res, next) {
        try {
            const receiverId = req.query.sender;
            const senderId = req.id;
            if (!receiverId || typeof receiverId !== 'string') {
                res.status(httpStatus_1.HttpStatus.BAD_REQUEST).json({ message: httpessages_1.HttpMessage.INVALID_RECEIVER });
                return;
            }
            const messages = await this._getAllMessagesService.getallmessage(receiverId, senderId);
            res.status(httpStatus_1.HttpStatus.OK).json(messages);
        }
        catch (error) {
            next(error);
        }
    }
    async deleteMessage(req, res, next) {
        try {
            const { messageid } = req.params;
            const sender = req.query.sender;
            const receiver = req.query.reciever;
            if (typeof sender !== 'string' || typeof receiver !== 'string') {
                res.status(httpStatus_1.HttpStatus.BAD_REQUEST).json({ message: httpessages_1.HttpMessage.INVALID_SENDER_OR_RECEIVER });
                return;
            }
            const result = await this._deleteMessageService.delete(messageid, sender, receiver);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async fetchUnreadMessageCount(req, res, next) {
        try {
            const userId = req.id;
            const count = await this._getUnreadCountService.getcount(userId);
            res.status(httpStatus_1.HttpStatus.OK).json({ unreadCount: count });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ConversationController = ConversationController;
