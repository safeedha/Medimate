"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveMessage = void 0;
class SaveMessage {
    constructor(_conversationrepository) {
        this._conversationrepository = _conversationrepository;
    }
    async MessageSave(senderId, recieverId, message, image) {
        const result = await this._conversationrepository.messageSave(senderId, recieverId, message, image);
        const messageDto = {
            _id: result._id?.toString(),
            senderId: result.senderId?.toString(),
            recieverId: result.recieverId?.toString(),
            message: result.message ?? undefined,
            image: result.image ?? undefined,
            messageType: result.messageType,
            read: result.read ?? false,
        };
        return messageDto;
    }
}
exports.SaveMessage = SaveMessage;
