"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditSlot = void 0;
const rrule_1 = require("rrule");
const timeconvert_1 = require("../../service/timeconvert");
class EditSlot {
    constructor(_baseRepository, _slotrepository) {
        this._baseRepository = _baseRepository;
        this._slotrepository = _slotrepository;
    }
    async editSlots(recId, id, startDate, endDate, selectedDays, startTime, endTime, interval, frequency) {
        try {
            //  const dayMap: Record<string, Weekday> = {
            //   MO: RRule.MO,
            //   TU: RRule.TU,
            //   WE: RRule.WE,
            //   TH: RRule.TH,
            //   FR: RRule.FR,
            //   SA: RRule.SA,
            //   SU: RRule.SU,
            // };
            const [startHour, startMinute] = startTime.split(':').map(Number);
            const [year, month, day] = startDate.split('-').map(Number);
            const dtStart = new Date(Date.UTC(year, month - 1, day, startHour, startMinute, 0));
            const until = new Date(endDate);
            until.setHours(23, 59, 59, 999);
            //  const selectedRRuleDays = selectedDays.map(day => dayMap[day]);
            const rule = new rrule_1.RRule({
                freq: rrule_1.RRule[frequency],
                interval,
                byweekday: selectedDays,
                dtstart: dtStart,
                until,
            });
            const st = (0, timeconvert_1.convertTo12HourFormat)(startTime);
            const et = (0, timeconvert_1.convertTo12HourFormat)(endTime);
            const allSlots = rule.all();
            const data = {
                _id: recId,
                doctorId: id,
                startDate: dtStart,
                endDate: until,
                frequency: frequency,
                interval: interval,
                daysOfWeek: selectedDays,
                starttime: startTime,
                endttime: endTime
            };
            const recurringslot = await this._slotrepository.editRecurringSlot(data);
            await this._slotrepository.deletrRecurringSlot(recId);
            for (const item of allSlots) {
                const date = new Date(item);
                const slotData = {
                    recurringSlotId: recurringslot._id,
                    doctorId: id,
                    date: date,
                    startingTime: st,
                    endTime: et,
                    status: "available"
                };
                await this._baseRepository.create(slotData);
            }
            return { message: "slot creation sucessfull" };
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error);
                throw new Error(error.message);
            }
            else {
                throw new Error("An unknown error occurred");
            }
        }
    }
}
exports.EditSlot = EditSlot;
