"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRecurringSlot = void 0;
class GetRecurringSlot {
    constructor(_slotrepository) {
        this._slotrepository = _slotrepository;
    }
    async getSlots(id, page, limit) {
        try {
            const slots = await this._slotrepository.getAllreccslots(id, page, limit);
            const mapped = slots.data.map((slot) => ({
                _id: slot._id.toString(),
                doctorId: typeof slot.doctorId === 'string'
                    ? slot.doctorId
                    : slot.doctorId?._id?.toString() || '',
                startDate: slot.startDate,
                endDate: slot.endDate,
                frequency: slot.frequency,
                interval: slot.interval,
                daysOfWeek: slot.daysOfWeek,
                starttime: slot.starttime,
                endttime: slot.endttime,
            }));
            return { data: mapped, total: slots.total };
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
exports.GetRecurringSlot = GetRecurringSlot;
