"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTimeUpdation = void 0;
class MessageTimeUpdation {
    constructor(_conversationrepository) {
        this._conversationrepository = _conversationrepository;
    }
    async update(sender, reciever) {
        try {
            const result = await this._conversationrepository.messagetimeaddfromuser(sender, reciever);
            return result;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            else {
                throw new Error("An unknown error occurred");
            }
        }
    }
}
exports.MessageTimeUpdation = MessageTimeUpdation;
