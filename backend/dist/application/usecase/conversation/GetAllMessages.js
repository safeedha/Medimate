"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllMessages = void 0;
class GetAllMessages {
    constructor(_conversationRepository) {
        this._conversationRepository = _conversationRepository;
    }
    async getallmessage(receiverId, senderId) {
        try {
            const result = await this._conversationRepository.getAllmessage(senderId, receiverId);
            const messages = result.map((msg) => ({
                _id: msg._id?.toString(),
                senderId: msg.senderId?.toString(),
                recieverId: msg.recieverId?.toString(),
                message: msg.message ?? undefined,
                image: msg.image ?? undefined,
                messageType: msg.messageType,
                read: msg.read ?? false,
            }));
            return messages;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("An unexpected error occurred while fetching messages");
        }
    }
}
exports.GetAllMessages = GetAllMessages;
