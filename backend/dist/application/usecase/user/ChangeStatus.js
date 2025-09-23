"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeStatus = void 0;
class ChangeStatus {
    constructor(_baseRepository) {
        this._baseRepository = _baseRepository;
    }
    async changesatus(id) {
        try {
            const users = await this._baseRepository.delete(id);
            return users;
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
exports.ChangeStatus = ChangeStatus;
