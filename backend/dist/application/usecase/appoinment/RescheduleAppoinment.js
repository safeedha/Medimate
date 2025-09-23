"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reshedule = void 0;
class Reshedule {
    constructor(_baseRepository, _appointmentRepo, _slotRepository) {
        this._baseRepository = _baseRepository;
        this._appointmentRepo = _appointmentRepo;
        this._slotRepository = _slotRepository;
    }
    async createresedule(canceledappoinment, newslot) {
        const existing = await this._baseRepository.findById(canceledappoinment);
        if (!existing) {
            throw new Error("Failed to fetch single appointment");
        }
        const data = {
            user_id: existing.user_id,
            doctor_id: existing.doctor_id,
            schedule_id: newslot,
            patient_name: existing.patient_name,
            patient_email: existing.patient_email,
            patient_age: existing.patient_age,
            patient_gender: existing.patient_gender,
            reason: existing.reason,
            status: 'pending',
            payment_status: 'paid',
        };
        const appointment = await this._baseRepository.create(data);
        if (!appointment) {
            throw new Error("Failed to create appointment");
        }
        await this._appointmentRepo.rescheduleStatus(canceledappoinment, appointment._id);
        await this._slotRepository.changeStatus(newslot);
        return 'Appoinment rescheduled';
    }
}
exports.Reshedule = Reshedule;
