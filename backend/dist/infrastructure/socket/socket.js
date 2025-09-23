"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSocketEvents = void 0;
const SaveMessage_1 = require("../../application/usecase/conversation/SaveMessage");
const ConversationRepositoryImpl_ts_1 = require("../repository/ConversationRepositoryImpl.ts");
const NotificationRepositoryImpl_1 = require("../repository/NotificationRepositoryImpl");
const ChangeReadStatus_1 = require("../../application/usecase/conversation/ChangeReadStatus");
const Addnotification_1 = require("../../application/usecase/notification/Addnotification");
const mongoConversationRepo = new ConversationRepositoryImpl_ts_1.MongoConversationRepo();
const mongoNotification = new NotificationRepositoryImpl_1.MongoNotification();
const savemessage = new SaveMessage_1.SaveMessage(mongoConversationRepo);
const messageread = new ChangeReadStatus_1.ReadMessageStatus(mongoConversationRepo);
const addnotification = new Addnotification_1.Addnotification(mongoNotification);
const users = {};
const notification = {};
const participant = {};
const registerSocketEvents = async (io) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);
        socket.on('register', (userId) => {
            if (users[userId]) {
                if (!users[userId].includes(socket.id)) {
                    users[userId].push(socket.id);
                }
            }
            else {
                users[userId] = [socket.id];
            }
            socket.data.userId = userId;
            io.emit('online-users', Object.keys(users));
        });
        socket.on('notification', (Id) => {
            if (notification[Id]) {
                if (!notification[Id].includes(socket.id)) {
                    notification[Id].push(socket.id);
                }
            }
            else {
                notification[Id] = [socket.id];
            }
        });
        socket.on("joinRoom1", (userId) => {
            socket.join(userId);
            console.log(`User ${userId} joined their personal room`);
        });
        socket.on("leaveRoom1", (userId) => {
            socket.leave(userId);
            console.log(`User ${userId} left their personal room`);
        });
        socket.on('notification_message', async (data) => {
            await addnotification.addnotification(data.userId, data.doctorId, data.message, data.type);
            console.log('he');
            io.to(data.userId).emit('notification_count', 1, data.message);
        });
        socket.on('read', (data) => {
            if (participant[data] && participant[data].length > 0) {
                const recieverSocket = participant[data];
                recieverSocket.forEach((socketId) => {
                    io.to(socketId).emit('messageReaded', true);
                });
            }
        });
        socket.on('participant', ({ participantId }) => {
            if (!participant[participantId]) {
                participant[participantId] = [];
            }
            if (!participant[participantId].includes(socket.id)) {
                participant[participantId].push(socket.id);
            }
            console.log(participant);
        });
        socket.on('leaveParticipant', ({ participantId }) => {
            if (participant[participantId]) {
                participant[participantId] = participant[participantId].filter(id => id !== socket.id);
            }
        });
        socket.on('joinRoom', ({ roomId }) => {
            socket.join(roomId);
            console.log(`✅ Socket ${socket.id} joined room ${roomId}`);
        });
        socket.on('leaveRoom', ({ roomId }) => {
            socket.leave(roomId);
            console.log(`❌ Socket ${socket.id} left room ${roomId}`);
        });
        socket.on('privateMessage', async ({ from, to, message = null, image = null, roomId }) => {
            let messages = await savemessage.MessageSave(from, to, message, image);
            console.log('this is message', messages);
            if (!participant[`${to}_${from}`] || participant[`${to}_${from}`].length === 0) {
                const senderSockets = users[to] || [];
                senderSockets.forEach((socketId) => {
                    io.to(socketId).emit('notification', { count: 1, reciever: from });
                });
            }
            else {
                messages = await messageread.readmessage(messages._id);
            }
            io.to(roomId).emit('privateMessage', messages);
        });
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
            const userId = socket.data.userId;
            if (userId && users[userId]) {
                users[userId] = users[userId].filter(id => id !== socket.id);
                if (users[userId].length === 0) {
                    delete users[userId];
                }
            }
        });
    });
};
exports.registerSocketEvents = registerSocketEvents;
