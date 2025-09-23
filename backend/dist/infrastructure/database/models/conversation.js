"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationModel = void 0;
const mongoose_1 = require("mongoose");
const conversationSchema = new mongoose_1.Schema({
    participants: {
        type: [String],
        // refPath: 'participantsModel',
        // required: true,
    },
    // participantsModel: [
    //   {
    //     type: String,
    //     required: true,
    //     enum: ['User', 'Doctor'],
    //   },
    // ],
    messages: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Message',
            default: [],
        },
    ],
}, { timestamps: true });
exports.ConversationModel = (0, mongoose_1.model)('Conversation', conversationSchema);
