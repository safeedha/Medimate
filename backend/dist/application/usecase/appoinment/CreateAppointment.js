"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppointment = void 0;
;
class CreateAppointment {
    constructor(_baseRepository, slotRepository, walletRepository) {
        this._baseRepository = _baseRepository;
        this.slotRepository = slotRepository;
        this.walletRepository = walletRepository;
    }
    async createAppointment(id, doctorId, slot, name, email, age, gender, reason, amount) {
        try {
            const data = {
                user_id: id,
                doctor_id: doctorId,
                schedule_id: slot,
                patient_name: name,
                patient_email: email,
                patient_age: age,
                patient_gender: gender,
                reason: reason,
                status: 'pending',
                payment_status: 'paid',
            };
            const appointment = await this._baseRepository.create(data);
            if (!appointment) {
                throw new Error("Failed to create appointment");
            }
            await this.slotRepository.changeStatus(slot);
            await this.walletRepository.addmoneywallet(amount, id, doctorId, appointment._id);
            return { message: 'Appointment created successfully' };
        }
        catch (error) {
            console.error('Error creating appointment:', error);
            throw new Error('Failed to create appointment');
        }
    }
}
exports.CreateAppointment = CreateAppointment;
