"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLockslot = void 0;
class CreateLockslot {
    constructor(_slotRepository) {
        this._slotRepository = _slotRepository;
    }
    async createLock(slot, doctorId) {
        try {
            const slotlocked = {
                doctorId: doctorId,
                slotId: slot,
            };
            const slotlock = await this._slotRepository.lockAvailableSlot(slotlocked);
            return slotlock;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            else {
                throw new Error('some error occured');
            }
        }
    }
}
exports.CreateLockslot = CreateLockslot;
