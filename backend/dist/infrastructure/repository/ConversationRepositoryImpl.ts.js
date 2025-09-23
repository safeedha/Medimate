"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoConversationRepo = void 0;
const conversation_1 = require("../database/models/conversation");
const message_1 = require("../database/models/message");
const mongoose_1 = require("mongoose");
const docter_1 = require("../database/models/docter");
const user_1 = require("../database/models/user");
class MongoConversationRepo {
    constructor() {
    }
    async getAllmessage(sender, receiver) {
        try {
            await message_1.MessageModel.updateMany({ senderId: sender, recieverId: receiver, read: false }, { $set: { read: true } });
            const conversation = await conversation_1.ConversationModel.findOne({
                participants: { $all: [sender, receiver] },
            }).populate("messages");
            if (!conversation) {
                throw new Error("No conversation found");
            }
            return conversation.messages;
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message + "jhlkj");
                throw new Error(error.message);
            }
            throw new Error("Something happened");
        }
    }
    async messagedelete(messageId, sender, receiver) {
        try {
            await message_1.MessageModel.deleteOne({ _id: messageId });
            const conversation = await conversation_1.ConversationModel.findOne({
                participants: { $all: [sender, receiver] },
            });
            if (!conversation) {
                throw new Error('Conversation not found');
            }
            const objectId = new mongoose_1.Types.ObjectId(messageId);
            conversation.messages = conversation.messages.filter((id) => !id.equals(objectId));
            await conversation.save();
            return 'Message deleted';
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Unexpected error occurred during delete message');
        }
    }
    async changereadstatus(messageId) {
        await message_1.MessageModel.updateOne({ _id: messageId }, { $set: { read: true } });
        const message = await message_1.MessageModel.findOne({ _id: messageId });
        if (!message) {
            throw new Error('message not found');
        }
        return message;
    }
    async messageSave(sender, reciever, message, image) {
        if (!message && !image) {
            throw new Error("Either message or image is required");
        }
        let newMessage;
        if (message) {
            newMessage = new message_1.MessageModel({
                senderId: sender,
                recieverId: reciever,
                messageType: 'text',
                message,
            });
        }
        else if (image) {
            newMessage = new message_1.MessageModel({
                senderId: sender,
                recieverId: reciever,
                messageType: 'image',
                image,
            });
        }
        let conversation = await conversation_1.ConversationModel.findOne({
            participants: { $all: [sender, reciever] },
        });
        if (!conversation) {
            conversation = await conversation_1.ConversationModel.create({
                participants: [sender, reciever],
            });
        }
        if (!newMessage) {
            throw new Error("Message creation failed unexpectedly");
        }
        const objectId = new mongoose_1.Types.ObjectId(newMessage._id);
        conversation.messages.push(objectId);
        await Promise.all([conversation.save(), newMessage.save(),]);
        return newMessage;
    }
    async getcount(recieverId) {
        try {
            const count = await message_1.MessageModel.aggregate([
                { $match: { recieverId: recieverId, read: false } },
                { $group: { _id: "$senderId", count: { $sum: 1 } } }
            ]);
            const result = {};
            count.forEach(item => {
                result[item._id] = item.count;
            });
            return result;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Unexpected error occurred during doctor registration');
        }
    }
    async messagetimeaddfromdoc(sender, receiver) {
        try {
            const now = new Date();
            await docter_1.Doctor.updateOne({ _id: sender }, { $set: { lastMessage: now } });
            await user_1.User.updateOne({ _id: receiver }, { $set: { lastMessage: now } });
            return 'message updated';
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Unexpected error occurred');
        }
    }
    async messagetimeaddfromuser(sender, receiver) {
        try {
            const now = new Date();
            await user_1.User.updateOne({ _id: sender }, { $set: { lastMessage: now } });
            await docter_1.Doctor.updateOne({ _id: receiver }, { $set: { lastMessage: now } });
            return 'message updated';
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Unexpected error occurred');
        }
    }
}
exports.MongoConversationRepo = MongoConversationRepo;
