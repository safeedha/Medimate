"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSlotByDate = void 0;
class GetSlotByDate {
    constructor(_slotrepository) {
        this._slotrepository = _slotrepository;
    }
    async getSlotsByDate(id, date) {
        try {
            const slots = await this._slotrepository.getSlotsByDate(id, date);
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
exports.GetSlotByDate = GetSlotByDate;
