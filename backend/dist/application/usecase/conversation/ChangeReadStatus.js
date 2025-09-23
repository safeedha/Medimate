"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadMessageStatus = void 0;
class ReadMessageStatus {
    constructor(_conversationrepository) {
        this._conversationrepository = _conversationrepository;
    }
    async readmessage(messageId) {
        const result = await this._conversationrepository.changereadstatus(messageId);
        const messageDto = {
            _id: result._id?.toString(),
            senderId: result.senderId?.toString(),
            recieverId: result.recieverId?.toString(),
            message: result.message ?? undefined, // safely handle null
            image: result.image ?? undefined,
            messageType: result.messageType,
            read: result.read ?? false,
        };
        return messageDto;
    }
}
exports.ReadMessageStatus = ReadMessageStatus;
