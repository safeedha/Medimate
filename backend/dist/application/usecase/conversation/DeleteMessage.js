"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deletemessage = void 0;
class Deletemessage {
    constructor(_conversationrepository) {
        this._conversationrepository = _conversationrepository;
    }
    async delete(messageId, sender, reciever) {
        try {
            const result = await this._conversationrepository.messagedelete(messageId, sender, reciever);
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
exports.Deletemessage = Deletemessage;
