"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUnreadCountMessage = void 0;
class GetUnreadCountMessage {
    constructor(_conversationRepository) {
        this._conversationRepository = _conversationRepository;
    }
    async getcount(receiverId) {
        try {
            const count = await this._conversationRepository.getcount(receiverId);
            return count;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('An unexpected error occurred while fetching unread counts');
        }
    }
}
exports.GetUnreadCountMessage = GetUnreadCountMessage;
