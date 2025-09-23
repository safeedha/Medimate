"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Addnotification = void 0;
class Addnotification {
    constructor(_baseRepository) {
        this._baseRepository = _baseRepository;
    }
    async addnotification(user, doctor, message, type) {
        await this._baseRepository.create({ userId: user, senderId: doctor, message, type });
    }
}
exports.Addnotification = Addnotification;
