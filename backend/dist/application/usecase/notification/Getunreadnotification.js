"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Getunreadnotification = void 0;
class Getunreadnotification {
    constructor(_notRepository) {
        this._notRepository = _notRepository;
    }
    async getnotification(id) {
        const notifications = await this._notRepository.getUnreadnotification(id);
        return notifications.map((n) => ({
            _id: n._id,
            type: n.type,
            message: n.message,
            createdAt: n.createdAt
        }));
    }
}
exports.Getunreadnotification = Getunreadnotification;
