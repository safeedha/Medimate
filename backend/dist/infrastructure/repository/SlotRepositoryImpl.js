"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoSlotRepostory = void 0;
const recurringslot_1 = require("../database/models/recurringslot");
const scedule_1 = require("../database/models/scedule");
const slotlock_1 = require("../database/models/slotlock");
const BaseRepositoryImpl_1 = require("./BaseRepositoryImpl");
class MongoSlotRepostory extends BaseRepositoryImpl_1.BaseRepository {
    async lockAvailableSlot(data) {
        try {
            const existingLock = await slotlock_1.SlotLock.findOne({
                doctorId: data.doctorId,
                slotId: data.slotId,
                status: { $in: ['locked', 'confirmed'] },
            });
            if (existingLock) {
                throw new Error('Slot is already locked or confirmed');
            }
            const slotLock = new slotlock_1.SlotLock({
                doctorId: data.doctorId,
                slotId: data.slotId,
                status: 'locked',
            });
            await slotLock.save();
            return 'Slot is locked';
        }
        catch (error) {
            if (error instanceof Error) {
                throw Error(error.message);
            }
            throw Error("Somethin happend");
        }
    }
    async createRecurringSlot(data) {
        try {
            const existingSlots = await recurringslot_1.Recurring.find({
                doctorId: data.doctorId,
                startDate: { $lte: data.endDate },
                endDate: { $gte: data.startDate },
                starttime: { $lte: data.endttime },
                endttime: { $gte: data.starttime }
            });
            for (const slot of existingSlots) {
                const sharedDays = slot.daysOfWeek.filter((day) => data.daysOfWeek.includes(day));
                if (sharedDays.length > 0) {
                    throw new Error(`Recurring schedule conflict: Overlapping with existing slot from ${slot.startDate.toDateString()} to ${slot.endDate.toDateString()} on [${sharedDays.join(", ")}] between ${slot.starttime} and ${slot.endttime}.`);
                }
            }
            const recurring = new recurringslot_1.Recurring(data);
            const savedRecurring = await recurring.save();
            return savedRecurring;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("Something happened");
        }
    }
    async editRecurringSlot(data) {
        try {
            const slots = await scedule_1.Slot.find({ recurringSlotId: data._id });
            if (slots.length === 0) {
                throw new Error("No slots found with the given recurringSlotId");
            }
            const isAnyBooked = slots.some(slot => slot.status === "booked");
            if (isAnyBooked) {
                throw new Error("Cannot Edit, because one or more slots are already booked");
            }
            const existingSlots = await recurringslot_1.Recurring.find({
                _id: { $ne: data._id },
                doctorId: data.doctorId,
                startDate: { $lte: data.endDate },
                endDate: { $gte: data.startDate },
                starttime: { $lte: data.endttime },
                endttime: { $gte: data.starttime },
            });
            for (const slot of existingSlots) {
                const sharedDays = slot.daysOfWeek.filter((day) => data.daysOfWeek.includes(day));
                if (sharedDays.length > 0) {
                    throw new Error(`Recurring schedule conflict: Overlapping with existing slot from ${slot.startDate.toDateString()} to ${slot.endDate.toDateString()} on [${sharedDays.join(", ")}] between ${slot.starttime} and ${slot.endttime}.`);
                }
            }
            const updatedSlot = await recurringslot_1.Recurring.findByIdAndUpdate(data._id, {
                $set: {
                    startDate: data.startDate,
                    endDate: data.endDate,
                    frequency: data.frequency,
                    interval: data.interval,
                    starttime: data.starttime,
                    endttime: data.endttime,
                    daysOfWeek: data.daysOfWeek,
                },
            }, { new: true });
            if (!updatedSlot) {
                throw new Error("Recurring slot not found or update failed");
            }
            return updatedSlot;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error editing recurring slot: ${error.message}`);
            }
            throw error;
        }
    }
    async create(data) {
        const slot = new scedule_1.Slot(data);
        await slot.save();
    }
    async getAllreccslots(id, page, limit) {
        try {
            const skip = (page - 1) * limit;
            const recurring = await recurringslot_1.Recurring.find({ doctorId: id })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);
            const total = await recurringslot_1.Recurring.countDocuments({ doctorId: id });
            return {
                data: recurring,
                total,
            };
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("Something happened");
        }
    }
    async getSlotsByDate(id, date) {
        try {
            const now = new Date();
            const startOfDay = new Date(date);
            startOfDay.setUTCHours(0, 0, 0, 0); // 00:00:00 UTC
            const endOfDay = new Date(date);
            endOfDay.setUTCHours(23, 59, 59, 999); // 23:59:59.999 UTC
            const isToday = now.getUTCFullYear() === startOfDay.getUTCFullYear() &&
                now.getUTCMonth() === startOfDay.getUTCMonth() &&
                now.getUTCDate() === startOfDay.getUTCDate();
            const baseQuery = {
                doctorId: id,
                date: { $gte: startOfDay, $lte: endOfDay },
            };
            if (isToday) {
                const currentTime = now.toISOString().split('T')[1]?.slice(0, 5); // e.g., "14:30"
                baseQuery.startingTime = { $gt: currentTime };
            }
            const slots = await scedule_1.Slot.find(baseQuery).sort({ startingTime: 1 });
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
    async changeStatus(id) {
        try {
            const slot = await scedule_1.Slot.findById(id);
            if (!slot) {
                throw new Error("Slot not found");
            }
            if (slot.status === "available") {
                slot.status = "booked";
            }
            else {
                slot.status = "available";
            }
            await slot.save();
            console.log(slot);
            return { message: `Slot status changed ${slot.status}` };
        }
        catch (error) {
            if (error instanceof Error) {
                throw Error(error.message);
            }
            throw Error("Somethin happend");
        }
    }
    async deletrRecurringSlot(recId) {
        try {
            await scedule_1.Slot.deleteMany({ recurringSlotId: recId });
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("Something happened");
        }
    }
    async cancelreccslots(id) {
        try {
            const slots = await scedule_1.Slot.find({ recurringSlotId: id });
            if (slots.length === 0) {
                throw new Error("No slots found with the given recurringSlotId");
            }
            const isAnyBooked = slots.some(slot => slot.status === "booked");
            if (isAnyBooked) {
                throw new Error("Cannot cancel because one or more slots are already booked");
            }
            await scedule_1.Slot.deleteMany({ recurringSlotId: id });
            await recurringslot_1.Recurring.deleteOne({ _id: id });
            return "Recurring slots cancelled successfully";
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("Something happened");
        }
    }
    async delete(id) {
        try {
            await scedule_1.Slot.deleteOne({ _id: id });
            return "slot cancelled successfully";
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("Something happened");
        }
    }
}
exports.MongoSlotRepostory = MongoSlotRepostory;
