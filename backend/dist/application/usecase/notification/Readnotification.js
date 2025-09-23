"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Readnotification = void 0;
class Readnotification {
    constructor(_notRepository) {
        this._notRepository = _notRepository;
    }
    async readnotification(id) {
        await this._notRepository.readNotification(id);
    }
}
exports.Readnotification = Readnotification;
