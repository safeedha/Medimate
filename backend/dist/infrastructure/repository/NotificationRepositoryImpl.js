"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoNotification = void 0;
const notificatio_1 = require("../database/models/notificatio");
const BaseRepositoryImpl_1 = require("./BaseRepositoryImpl");
class MongoNotification extends BaseRepositoryImpl_1.BaseRepository {
    async create(data) {
        const newNotification = new notificatio_1.Notification({ ...data });
        await newNotification.save();
    }
    async readNotification(id) {
        await notificatio_1.Notification.updateMany({ userId: id }, { $set: { isRead: true } });
    }
    async getUnreadnotification(id) {
        return notificatio_1.Notification.find({ userId: id, isRead: false })
            .sort({ createdAt: 1 });
    }
}
exports.MongoNotification = MongoNotification;
