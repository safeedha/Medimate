"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangestatusAppointment = void 0;
class ChangestatusAppointment {
    constructor(_appointmentRepo, slotRepository, walletRepository) {
        this._appointmentRepo = _appointmentRepo;
        this.slotRepository = slotRepository;
        this.walletRepository = walletRepository;
    }
    async changestus(appoinmentid, status, reschedule = false) {
        try {
            const result = await this._appointmentRepo.changestatus(appoinmentid, status);
            if (status === 'cancelled') {
                const slotId = result.schedule_id?.toString();
                await this.slotRepository.changeStatus(slotId);
                if (!result.followup_doc) {
                    if (!reschedule) {
                        const refunds = await this.walletRepository.getRefundTransaction(appoinmentid);
                        await this.walletRepository.addrefund(refunds);
                        return { message: "refund added" };
                    }
                }
            }
            return { message: "Status updated" };
        }
        catch (error) {
            if (error instanceof Error) {
                throw Error(error.message);
            }
            throw Error("error in fetching");
        }
    }
}
exports.ChangestatusAppointment = ChangestatusAppointment;
