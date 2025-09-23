"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Createfollowup = void 0;
class Createfollowup {
    constructor(_baseRepository, _appointmentRepo, slotRepository) {
        this._baseRepository = _baseRepository;
        this._appointmentRepo = _appointmentRepo;
        this.slotRepository = slotRepository;
    }
    async createfollowpappinment(slotId, appoinmentId) {
        try {
            await this.slotRepository.changeStatus(slotId);
            const singleappoinment = await this._baseRepository.findById(appoinmentId);
            if (!singleappoinment) {
                throw new Error("Failed to create single appointment");
            }
            const data = {
                user_id: singleappoinment.user_id,
                doctor_id: singleappoinment.doctor_id,
                schedule_id: slotId,
                patient_name: singleappoinment.patient_name,
                patient_email: singleappoinment.patient_email,
                patient_age: singleappoinment.patient_age,
                patient_gender: singleappoinment.patient_gender,
                reason: `followup for ${singleappoinment.reason}`,
                status: 'pending',
                payment_status: 'paid',
                followup_doc: true
            };
            const appointment = await this._baseRepository.create(data);
            if (!appointment) {
                throw new Error("Failed to create appointment");
            }
            const result = await this._appointmentRepo.createfollowp(appoinmentId, appointment._id);
            return result;
        }
        catch (error) {
            if (error instanceof Error) {
                throw Error(error.message);
            }
            throw Error("error in fetching");
        }
    }
}
exports.Createfollowup = Createfollowup;
