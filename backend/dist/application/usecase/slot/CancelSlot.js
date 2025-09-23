"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelSlot = void 0;
class CancelSlot {
    constructor(_baseRepository, _slotrepository) {
        this._baseRepository = _baseRepository;
        this._slotrepository = _slotrepository;
    }
    async cancelSlot(id) {
        try {
            const slots = await this._baseRepository.delete(id);
            return slots;
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
exports.CancelSlot = CancelSlot;
