"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelRecurringSlot = void 0;
class CancelRecurringSlot {
    constructor(_slotrepository) {
        this._slotrepository = _slotrepository;
    }
    async cancelSlots(id) {
        try {
            const slots = await this._slotrepository.cancelreccslots(id);
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
exports.CancelRecurringSlot = CancelRecurringSlot;
